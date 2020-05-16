const redisClient = require('../redisClient');
const shortid = require('shortid');


function Rooms(){
    this.client = redisClient.getClient()
}

module.exports = new Rooms();

Rooms.prototype.upsert = function(roomName){// aktif kullanıcıları Hset 'te tutacağız
const newid = shortid.generate();    
this.client.hset(
        'rooms',
        '@Room:'+newid,
        JSON.stringify({
            id:'@Room:'+newid,
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

Rooms.prototype.list = function (callback){
    let roomList = [];

    this.client.hgetall('rooms',function(err,rooms){
        if(err){
            console.log(err);
            return callback([]);
        }

        for(let room in rooms){
            roomList.push(JSON.parse(rooms[room]));
        }

        return callback(roomList);
    })
}
