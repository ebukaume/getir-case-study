const { Schema, model } = require('mongoose');

const recordCollectionName = 'records';

const recordSchema = new Schema({
  key: String,
  value: String,
  counts: [Number],
}, { timestamps: true });

recordSchema.index({ createdAt: 1 }, { background: true });

module.exports = model(recordCollectionName, recordSchema);
