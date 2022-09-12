import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface TeamInput {
  creator: UserDocument["_id"];
  name: string;
  logo: string;
}

export interface TeamDocument extends TeamInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TeamsModel = mongoose.model<TeamDocument>("Team", TeamSchema);

export default TeamsModel;
