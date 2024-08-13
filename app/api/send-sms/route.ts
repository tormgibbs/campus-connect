import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, message } = req.body;

    const apiKey = '3w72C56POeMmp07tBxyVzS2Wj';
    const senderId = 'HBD';
    const url = `https://apps.mnotify.net/smsapi?key=${apiKey}&to=${encodeURIComponent(to)}&msg=${encodeURIComponent(message)}&sender_id=${senderId}`;

    try {
      const response = await fetch(url, {
        method: 'GET', // Use GET method as per the URL structure
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        res.status(200).json({ message: 'SMS sent successfully' });
      } else {
        res.status(400).json({ message: 'Failed to send SMS' });
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
