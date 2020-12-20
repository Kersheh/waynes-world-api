import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (_, data) => {
        const { __v, _id, ...object } = data;
        return {
          ...object,
          id: _id
        };
      }
    }
  }
})
export class Album {
  @prop()
  public album!: string;

  @prop()
  public artist!: string;

  @prop()
  public year?: number;

  @prop()
  public genre?: string;

  @prop()
  public shelf?: string;

  @prop()
  public comments?: string;

  @prop()
  public artBase64?: string;

  @prop({ type: Boolean })
  public favourite = false;

  @prop()
  public favouritedAt?: Date;
}

export default getModelForClass(Album);
