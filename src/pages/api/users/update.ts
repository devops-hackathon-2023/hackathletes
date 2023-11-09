import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/types/User';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/users/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // REGISTER USER
  if (req.method === 'PATCH') {
    const { userId, favourites } = req.body;

    const jsonData: any = await fsPromises.readFile(dataFilePath);

    const users = JSON.parse(jsonData);

    const userIndex = users.findIndex((user: User) => user.id === userId);
    const foundUser: User = users.find((user: User) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex] = { ...foundUser, favourites };

      await fsPromises.writeFile(dataFilePath, JSON.stringify(users));
      res.status(200).json(users[userIndex]);
    } else {
      res.status(201).json({ message: 'User not found' });
    }
  }
};
export default handler;
