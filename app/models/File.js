'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let fileSchema = new Schema({
  id: {
    type: String
  },
  public_id: {
    type: String
  },
  url: {
    type: String
  }
});

mongoose.model('File', fileSchema);