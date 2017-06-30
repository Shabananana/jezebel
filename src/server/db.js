import {Pool, Client} from 'pg';
import config from './config';

export const pool = new Pool(config);
export const client = new Client(config);
