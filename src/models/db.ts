import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'Ma$$ichiara07',
    host: 'localhost',
    port: 5432,
    database: 'woridb'
})

export default pool;