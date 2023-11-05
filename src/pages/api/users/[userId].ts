import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/types/User';

export const users: User[] = [
  {
    id: '1',
    name: 'František Fousek',
    role: 'DevOps',
    password: 'password123',
    profilePicture: '/profile-pictures/fousek.jpg',
    sases: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'DevOps',
      },
      {
        id: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        name: 'Loans',
      },
    ],
  },
];

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  const user = users.find(({ id }) => id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export default userHandler;
