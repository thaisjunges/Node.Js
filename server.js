import fs from 'node:fs'
import Fastify from "fastify"
import { } from './database-memory.js'
//import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js"
import path from 'node:path'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'


const server = Fastify()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//const database = new DatabaseMemory()
const database = new DatabasePostgres

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
})

//REQUEST BODY

server.post('/videos', async (req, reply) => {
    const { title, description, duration } = req.body

    await database.create({
        //short sintaxe 
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (req) => {
    const search = req.query.search

    const videos = await database.list(search)


    return videos
})

server.put('/videos/:id', async (req, reply) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (req, reply) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.get('/', async () => {
  return {
    project: "Video CRUD API",
    author: "Thais Junges",
    stack: ["Node.js", "Fastify", "PostgreSQL", "Neon"],
    status: "running"
  }
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
}).then(() => {
    console.log('🚀 Servidor HTTP rodando na porta 3333!');
})