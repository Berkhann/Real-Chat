const socketio = require('socket.io');
const socketAuthorication = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

// Soket Authorization
io.use(socketAuthorication);

/*
*Redis adaptor. Eğer birden fazla server varsa socketlerin biriri ile senkronize olması sağlanır.
*/

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT}));

io.on('connection', socket=>{
    console.log(socket.request.user.name + ' bağlandı.');
});

module.exports = socketApi;