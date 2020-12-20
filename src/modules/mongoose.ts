import config from 'config';
import mongoose from 'mongoose';

export const connectMongo = () => {
  return mongoose.connect(config.get('mongo.uri'), {
    dbName: config.get<string>('mongo.dbName'),
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export default mongoose;
