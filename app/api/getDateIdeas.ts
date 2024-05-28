import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDateSuggestion } from '@/lib/date-suggestion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { mood, budget, location } = req.body;

        try {
            const dateIdeas = await fetchDateSuggestion(mood, budget, location);
            res.status(200).json(dateIdeas);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate date ideas' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
