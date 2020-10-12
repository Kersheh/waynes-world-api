import { prop, getModelForClass } from '@typegoose/typegoose';

export class Album {
  @prop({ type: String })
  public album!: string;

  @prop({ type: String })
  public artist!: string;

  @prop({ type: Number })
  public year?: number;

  @prop({ type: String })
  public genre?: string;

  @prop({ type: String })
  public shelf?: string;

  @prop({ type: String })
  public comments?: string;
}

export default getModelForClass(Album, { schemaOptions: { timestamps: true } });
