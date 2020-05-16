const redisClient = require('../redisClient');


function Rooms(){
    this.client = redisClient.getClient()
}

module.exports = new Rooms();

Rooms.prototype.upsert = function(roomName){// aktif kullanıcıları Hset 'te tutacağız
    this.client.hset(
        'rooms',
        roomName,
        JSON.stringify({
            roomName,
            when: Date.now()
        }),
        err=>{
            if(err){
                console.log(err);
            }
        }
    )
};

