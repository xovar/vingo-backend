import { config } from "dotenv";

config({ path: `.env.local` });

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL