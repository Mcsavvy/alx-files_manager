// App Controllers For Express App
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export function getStatus(req, res) {
  const status = {
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  };
  res.status(200).send(status);
}

export function getStats(req, res) {
  dbClient.nbUsers().then((numUsers) => {
    // console.log(`num users: ${numUsers}`);
    dbClient.nbFiles().then((numFiles) => {
      // console.log(`num files: ${numFiles}`);
      res.status(200).send({ users: numUsers, files: numFiles });
    });
  });
}
