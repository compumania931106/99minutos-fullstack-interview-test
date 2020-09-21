import * as mongoose from 'mongoose';

export const PullSchema = new mongoose.Schema({
    externalId: { type: Number, unique: true },
    numberOfPull: { type: Number },
    author: { type: String },
    title: { type: String },
    body: { type: String },
    state: { type: String },
    closeAt: { type: Date },
    mergedAt: { type: Date },
}, {
    timestamps: true,
});
