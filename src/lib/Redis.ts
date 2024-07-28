import { createClient } from 'redis';

const Redis = createClient({
  url: 'redis://localhost:6379', // Change this if your Redis server is running on a different host or port
});

Redis.on('error', (err) => console.error('Redis Client Error', err));

Redis.connect();

export default Redis;
