import crypto from 'crypto';
import dbClient from '../utils/db';

export async function postNew(req, res) {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ error: 'Missing email' });
  if (!password) return res.status(400).send({ error: 'Missing password' });
  if (await dbClient.db.collection('users').findOne({ email })) {
    return res.status(400).send({ error: 'Already exist' });
  }
  const hash = crypto.createHash('sha1').update('password').digest('hex');
  const result = await dbClient.db
    .collection('users')
    .insertOne({ email, password: hash });
  const user = result.ops[0];
  res.status(200).send({ id: user._id, email: user.email });
  return result;
}

export function getMe(req, res) {
  const { userId } = req.params;
  if (!userId) return res.status(400).send('Missing userId');
  const user = dbClient.db.collection('users').findOne({ _id: userId });
  if (!user) return res.status(404).send('User not found');
  res.status(200).send({ id: user._id, email: user.email });
  return user;
}
