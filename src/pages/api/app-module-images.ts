import type { NextApiRequest, NextApiResponse } from 'next';

const images = [{ sas: 'devops', module: 'artifactory', src: '/app-module-images/george.png' }];

export default function imagesHandler(req: NextApiRequest, res: NextApiResponse) {
  const { sas, module } = req.query;

  const image = images.find((img) => img.sas === sas && img.module === module);

  if (image) {
    res.status(200).json(image);
  } else {
    res.status(200).json({ sas, module, src: '/app-module-images/placeholder.png' });
  }
}
