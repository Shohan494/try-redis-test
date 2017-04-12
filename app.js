var redis = require('redis');
//creates a new client
//By default, redis.createClient() will use 127.0.0.1 and 6379 as 
//the hostname and port respectively. If you have a different host/port 
//you can supply them as following:

//var client = redis.createClient(port, host);
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

//Storing Strings
client.set('framework', 'AngularJS', function(err, reply) {
  console.log(reply);
});

client.get('framework', function(err, reply) {
  console.log(reply);
});

//Storing Hash (Objects)
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

//Another way
client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

//storing lists
client.rpush(['lists', 'angularjs', 'backbone'], function(err, reply) {
  console.log(reply); //prints 2
});

client.lrange('lists', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});

//storing sets
//sets don't allow duplicates
client.sadd(['sets', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
  console.log(reply); // 3
});

client.smembers('sets', function(err, reply) {
  console.log(reply);
});

//Checking the Existence of Keys
client.exists('key', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

//deleting the list
client.del('lists', function(err, reply) {
    console.log(reply);
});

client.set('key1', 'val1');
client.expire('key1', 30);

client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log(reply); // 11
    });
});