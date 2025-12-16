import Fastify from "fastify"
import {} from './database-memory.js'
//import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js"

const server = Fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres

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

server.listen({
    port: 3333
}).then(() => {
    console.log('🚀 Servidor HTTP rodando na porta 3333!');
})