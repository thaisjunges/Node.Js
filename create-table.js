import { sql } from './db.js'

//sql`DROP TABLE IF EXISTS videos;`.then(() => {
//    console.log('Tabela apagada');
//})

sql`
   CREATE TABLE videos (
    id TEXT PRIMARY KEY, -- O ID agora é uma string obrigatória e única
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`.then(() => {
    console.log('Tabela criada');
})

