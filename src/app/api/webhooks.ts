import { NextApiRequest, NextApiResponse } from 'next';

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            // Handle the incoming webhook data here
            const webhookData = req.body;

            // Process the webhook data as needed
            console.log('Received webhook data:', webhookData);

            // Respond with a success status code
            res.status(200).json({ message: 'Webhook received successfully' });
        } else {
            // Respond with a method not allowed status code for non-POST requests
            res.status(405).end();
        }
    } catch (error) {
        // Handle any errors that occur during webhook processing
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
