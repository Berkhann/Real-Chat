const redis = require('redis');

function Users(){
    this.client = redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    });
}

module.exports = new Users();

Users.prototype.upsert = function(connectionId,meta){// aktif kullanıcıları Hset 'te tutacağız
    this.client.hset(
        'online',
        meta._id,
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err=>{
            if(err){
                console.log(err);
            }
        }
    )
};

Users.prototype.remove = function(_id){
    console.log('DISC'+ _id);
    this.client.hdel(
        'online',
        _id,
        err=>{
            if(err){
                console.log(err);
            }
        }
    )
    
}