import mongoose, { Schema, Document } from 'mongoose';

export interface IOpportunity extends Document {
  asset: string;
  buyExchange: string;
  buyPrice: number;
  sellExchange: string;
  sellPrice: number;
  spread: number;
  profitPercentage: number;
  timestamp: Date;
}

const OpportunitySchema: Schema = new Schema({
  asset: { type: String, required: true },
  buyExchange: { type: String, required: true },
  buyPrice: { type: Number, required: true },
  sellExchange: { type: String, required: true },
  sellPrice: { type: Number, required: true },
  spread: { type: Number, required: true },
  profitPercentage: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, expires: '24h' } // Auto-delete after 24h
});

// Compound index for faster queries
OpportunitySchema.index({ profitPercentage: -1, timestamp: -1 });

export default mongoose.model<IOpportunity>('Opportunity', OpportunitySchema);
