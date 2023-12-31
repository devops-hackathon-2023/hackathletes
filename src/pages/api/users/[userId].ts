import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/types/User';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/users/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // GET USER
  if (req.method === 'GET') {
    const jsonData: any = await fsPromises.readFile(dataFilePath);
    const users = JSON.parse(jsonData);
    const { userId } = req.query;

    const foundUser = users.find((user: User) => user.id === userId);

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(201).json({ message: 'User not found' });
    }
  }
};
export default handler;
