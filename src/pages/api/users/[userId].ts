import type {NextApiRequest, NextApiResponse} from 'next';
import User from '@/types/User';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/users/users.json');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const jsonData: any = await fsPromises.readFile(dataFilePath);
        const users = JSON.parse(jsonData);
        const {userId} = req.query;

        const user = users.find(({id}: any) => id === userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(201).json({message: 'User not found'});
        }
    }

    if (req.method === 'PATCH') {
        const {userId, updatedUser} = req.body;
        const jsonData: any = await fsPromises.readFile(dataFilePath);
        const users = JSON.parse(jsonData);
        const userIndex = users.findIndex(({id}: any) => id === userId);
        if (userIndex !== -1) {
            users[userIndex] = {...users[userIndex], ...updatedUser};
            await fsPromises.writeFile(dataFilePath, JSON.stringify(users));
            res.status(200).json(users[userIndex]);
        } else {
            res.status(201).json({message: 'User not found'});
        }
    }

    if (req.method === 'POST') {
        try {
            const jsonData: any = await fsPromises.readFile(dataFilePath);
            const users = JSON.parse(jsonData);
            const newId = users.length;

            const newUser: User = {
                id: String(newId),
                name: 'Petr Žďárek',
                role: 'DevOps',
                password: 'password123',
                profilePicture: '/profile-pictures/fousek.jpg',
                favourites: [],
            };

            users.push(newUser);
            await fsPromises.writeFile(dataFilePath, JSON.stringify(users));
            res.status(200).json({message: `Data stored successfully`});
        } catch (error) {
            res.status(500).json({message: 'Error storing data'});
        }
    }
};
export default handler;
