import type { NextApiRequest, NextApiResponse } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/github/bugs/bugs.json');

function generateRandomBugs(deploymentUnitId: string) {
  const numberOfBugs = Math.floor(Math.random() * 26) + 5; // Random number between 5 and 30
  const statuses = ['open', 'in progress', 'resolved'];
  const stages = ['dev', 'int', 'pred', 'prod', 'prs'];

  const randomBugs = Array.from({ length: numberOfBugs }, (_, index) => {
    let priority;
    const randomPriority = Math.random();
    if (randomPriority < 0.15) {
      priority = 'high';
    } else if (randomPriority < 0.5) {
      priority = 'low';
    } else {
      priority = 'medium';
    }

    return {
      id: (index + 1).toString(),
      name: `bug${index + 1}`,
      priority,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      stage: stages[Math.floor(Math.random() * stages.length)],
    };
  });

  return {
    deploymentUnitId,
    bugs: randomBugs,
  };
}
let writeQueue = Promise.resolve();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const jsonData = await fsPromises.readFile(dataFilePath, 'utf8');
      const fileBugs = JSON.parse(jsonData);
      const reqDeploymentUnitId = req.query.deploymentUnitId as string;

      const bugsEntry = fileBugs.find(({ deploymentUnitId }: any) => deploymentUnitId === reqDeploymentUnitId);
      if (bugsEntry) {
        res.status(200).json(bugsEntry);
      } else {
        const randomBugsEntry = generateRandomBugs(reqDeploymentUnitId);
        fileBugs.push(randomBugsEntry);

        // Queue the write operation
        writeQueue = writeQueue.then(() => fsPromises.writeFile(dataFilePath, JSON.stringify(fileBugs)));

        await writeQueue; // Wait for the current write operation to finish
        res.status(200).json(randomBugsEntry);
      }
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default handler;
