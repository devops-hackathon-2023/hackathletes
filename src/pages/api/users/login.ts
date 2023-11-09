import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/types/User';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/users/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // UPDATE USER FAVOURITES

  // LOGIN USER
  if (req.method === 'POST') {
    try {
      const jsonData: any = await fsPromises.readFile(dataFilePath);
      const users = JSON.parse(jsonData);

      const { email, password } = req.body;

      const foundUser = users.find((user: User) => user.email === email && user.password === password);

      await fsPromises.writeFile(dataFilePath, JSON.stringify(users));
      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: 'Wrong credentials or user does not exist.' });
    }
  }
};
export default handler;
