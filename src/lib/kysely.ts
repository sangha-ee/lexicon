import { createKysely } from "@vercel/postgres-kysely";
import { Database } from "./definitions";

export const db = createKysely<Database>();

export { sql } from "kysely";
