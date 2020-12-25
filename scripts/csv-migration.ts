import csvtojson from 'csvtojson';
import connectMongo from '../src/modules/mongoose';

csvtojson()
  .fromFile('csv/albums.csv')
  .then(json => {
    console.log(json);
  });
