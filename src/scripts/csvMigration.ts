import fs from 'fs';
import reader from 'readline-sync';
import csvtojson from 'csvtojson';
import fetch from 'node-fetch';
import { startCase } from 'lodash';
import { parseISO, getYear } from 'date-fns';
import { config as envConfig } from 'dotenv';
envConfig();

import SpotifyApi, { setSpotifyAccessToken } from 'modules/spotify';
import { connectMongo } from 'modules/mongoose';
import { addAlbum } from 'services/libraryService';

const albumsNotFound: Array<string> = [];
const albumsFailedToInsert: Array<string> = [];

const delay = () => new Promise(resolve => setTimeout(resolve, 2000));

let i = 0;
(async () => {
  try {
    await setSpotifyAccessToken();
    await connectMongo();

    const albums = await csvtojson().fromFile('csv/albums.csv');

    for (const album of albums) {
      // update token every 100 albums
      i++;
      if (i % 100 === 0) {
        await setSpotifyAccessToken();
      }

      const res = await SpotifyApi.search(
        `${album.Artist} ${album.Album}`,
        ['album'],
        { limit: 1 }
      );

      if (res.body?.albums?.items?.length === 0) {
        // track albums not found from search
        albumsNotFound.push(`${album.Artist} - ${album.Album}`);
        console.log(
          `Album not found on spotify ${album.Artist} - ${album.Album}`
        );
      } else {
        if (
          res.body?.albums?.items[0]?.artists[0]?.name.toLowerCase() !==
          album.Artist.toLowerCase().trim()
        ) {
          console.log(
            `Album found: ${album.Album} as ${res.body?.albums?.items[0].name}, but not matching input Artist: ${res.body?.albums?.items[0].artists[0].name} compared to ${album.Artist}`
          );

          const input = reader.question('Add album? (Y/n) ');

          if (input.toLowerCase() !== 'y') {
            // track albums found but incorrect artist name, prevent accidentally grabbing wrong album
            albumsNotFound.push(`${album.Artist} - ${album.Album}`);
            continue;
          }
        }

        // update database with album
        const { id, artists, name, release_date, images } =
          res.body?.albums?.items[0] ?? {};

        // throttle spotify api calls
        await delay();

        // fetch potential genre for album, fallback to artist genre if missing
        const albumInfoRes = await SpotifyApi.getAlbum(id ?? '');
        const genre = albumInfoRes?.body?.genres[0] ?? null;
        const artistID = albumInfoRes?.body?.artists[0]?.id ?? '';
        const artistInfoRes = genre
          ? ({} as any)
          : await SpotifyApi.getArtist(artistID);
        const genreFormatted =
          genre || artistInfoRes
            ? startCase(artistInfoRes?.body?.genres[0] ?? '')
            : '';

        // fetch album art
        const imgRes = await fetch(
          images?.find(img => img?.height ?? 0 < 640)?.url ?? ''
        );
        const arrayBuffer = await imgRes.arrayBuffer();
        const artBase64 = Buffer.from(arrayBuffer as any, 'binary').toString(
          'base64'
        );

        try {
          await addAlbum({
            artist: artists ? artists[0].name : '',
            album: name ?? '',
            year: getYear(parseISO(release_date ?? '')),
            genre: genreFormatted,
            artBase64: artBase64,
            shelf: '',
            comments: '',
            favourite: false
          });
          console.log(
            `Created album ${artists ? artists[0].name : ''} - ${name ?? ''}`
          );
        } catch (err) {
          albumsFailedToInsert.push(
            `${artists ? artists[0].name : ''} - ${name ?? ''}`
          );
          console.log('Failed to create album:', err);
        }
      }

      // throttle spotify api calls
      await delay();
    }

    // write missing/failed albums to file
    fs.writeFile(
      'csv-migration-missing-albums.txt',
      albumsNotFound.reduce((acc, val) => `${acc}${val}\n`, ''),
      err => {
        if (err) {
          console.error('Failed to write to csv-migration-missing-albums.txt');
        }
        console.log('csv-migration-missing-albums.txt updated');
      }
    );
    fs.writeFile(
      'csv-migration-failed-albums.txt',
      albumsFailedToInsert.reduce((acc, val) => `${acc}${val}\n`, ''),
      err => {
        if (err) {
          console.error('Failed to write to csv-migration-failed-albums.txt');
        }
        console.log('csv-migration-failed-albums.txt updated');
      }
    );
  } catch (err) {
    console.log('Failed to run migration script.', err);
    process.exit(1);
  }
})();
