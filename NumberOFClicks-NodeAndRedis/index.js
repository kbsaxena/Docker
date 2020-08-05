const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
	host: 'redis-server',  //This name we have provided in the docker-compose file
	post: 6379            //default port of redis server
});
client.set('visits', 0);

app.get('/', (req,res) => {
	client.get('visits', (err,visits) => {
		res.send('Number of Visits is -' + visits);
		client.set('visits', parseInt(visits) + 1);
	});
});

//xxxx:8081 should be used while running the app
app.listen(8081, () => {
	console.log('Listening on port 8081');
});