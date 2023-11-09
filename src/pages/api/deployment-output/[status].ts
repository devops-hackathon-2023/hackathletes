import type { NextApiRequest, NextApiResponse } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/deployment-output/outputs.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const jsonData: any = await fsPromises.readFile(dataFilePath);
    const outputs = JSON.parse(jsonData);
    const { status } = req.query;
    const foundOutput = outputs.find((output: any) => output.status === status);
    if (foundOutput) {
      res.status(200).json(foundOutput);
    } else {
      res.status(201).json({ message: 'User not found' });
    }
  }
};
export default handler;
