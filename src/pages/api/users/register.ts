import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/types/User';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/users/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // REGISTER USER
  if (req.method === 'POST') {
    try {
      const jsonData: any = await fsPromises.readFile(dataFilePath);
      const users = JSON.parse(jsonData);
      const newUser: User = req.body;

      users.push(newUser);

      await fsPromises.writeFile(dataFilePath, JSON.stringify(users));

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'problem with registration, try again please.' });
    }
  }
};
export default handler;
