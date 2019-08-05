const redis = require('redis');
const util = require('util');
const client = redis.createClient('redis://127.0.0.1:6379');
client.hget = util.promisify(client.hget); 
const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;


// CACHE
mongoose.Query.prototype.cache = function(options={}){
    this.useCache = true;
    this.hashedKey = options.key || '';
    console.log('CACHE OPTIONS', options);

    return this;
}


// EXEC
mongoose.Query.prototype.exec = async function(){
    if(!this.useCache){
        return exec.apply(this, arguments);
    }

    let key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });
    key = JSON.stringify(key);
    const cachedResult = await client.hget(this.hashedKey, key);
   
    if(cachedResult){
        return cachedResult;
        // return Array.isArray(cachedResult)
        // ?
        // cachedResult.map(doc => new this.model(doc))
        // :
        // new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashedKey, key, JSON.stringify(result));
    
    return result;
}


module.exports = client;