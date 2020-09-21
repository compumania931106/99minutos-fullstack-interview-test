import { Document } from 'mongoose';

export interface Pull extends Document {
    externalId: number;
    numberOfPull: number;
    author: string;
    title: string;
    body: string;
    state: string; 
    closeAt: Date;
    mergedAt: Date;
}
