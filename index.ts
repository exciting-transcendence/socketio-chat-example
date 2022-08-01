import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const port = process.env.PORT || 3000

const dir = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
  res.sendFile(`${dir}/index.html`)
})

io.on('connection', socket => {
  socket.emit('chat message', `${socket.id} connected`)

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
})

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
