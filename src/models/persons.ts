import { Schema, model, connect, set, connection } from 'mongoose';
const mongoose = require('mongoose');
import type { PersonType } from '../types';

set('strictQuery', false);

if (typeof process.env.MONGODB_URI === 'undefined') {
  throw new Error(`Variable ${process.env.MONGODB_URI} undefined.`);
}
const url: string = process.env.MONGODB_URI;

console.log('connecting to', url);

connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new Schema<PersonType>({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);

//const PersonModel = model('Person', personSchema);
