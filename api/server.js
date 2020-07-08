const express = require('express');
const configureMiddleware = require('./middleware/serversetup');
// const authRouter = require('./auth/authRouter');
const usersRouter = require('./routes/usersRouter');
const goatsRouter = require('./routes/goatsRouter');

const server = express()
configureMiddleware(server)

server.use('/api/users', usersRouter)
server.use('/api/goats', goatsRouter)

server.get('/', async (req, res) => {
  await res.status(200).json({ message: 'Server running....' })
})

module.exports = server