import mongoose from "mongoose";
import { UserDocument } from "./user.model";
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

export interface FixtureInput {
  creator: UserDocument["_id"];
  homeTeam: string;
  awayTeam: string;
  time: string;
  date: string;
  stadium: string;
  referee: string;
  status: string;
  slug?: string;
}

export interface FixtureDocument extends FixtureInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
  }

const FixtureSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
    referee: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    slug: {
      type: String, 
      slug: ["homeTeam", "awayTeam", "date"], 
      unique: true
    }
  },
  { timestamps: true }
);

const FixturesModel = mongoose.model<FixtureDocument>("Fixture", FixtureSchema);

export default FixturesModel;
