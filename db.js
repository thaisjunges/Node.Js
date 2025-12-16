import 'dotenv/config'; // Isso substitui o require('dotenv').config()
import { neon } from "@neondatabase/serverless";
import http from 'http'; // O http geralmente não fica no arquivo de banco de dados

export const sql = neon(process.env.DATABASE_URL);