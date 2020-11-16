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

  @prop({ type: String })
  public artBase64?: string;

  @prop({ type: Boolean })
  public favourite = false;
}

export default getModelForClass(Album);
