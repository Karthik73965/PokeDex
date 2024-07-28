// scripts/redis-dev.js

const { exec } = require('child_process');

exec('docker ps -q -f name=my-redis', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error checking container status: ${stderr}`);
    return;
  }

  if (!stdout) {
    exec('docker ps -aq -f status=exited -f name=my-redis', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error checking stopped container: ${stderr}`);
        return;
      }

      if (stdout) {
        exec('docker rm my-redis', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error removing container: ${stderr}`);
            return;
          }
          console.log('Removed stopped container my-redis.');
          runRedisContainer();
        });
      } else {
        runRedisContainer();
      }
    });
  } else {
    console.log('The container my-redis is already running.');
  }
});

function runRedisContainer() {
  exec('docker run -d --name my-redis -p 6379:6379 redis', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running container: ${stderr}`);
      return;
    }
    console.log('Started Redis container my-redis.');
  });
}
