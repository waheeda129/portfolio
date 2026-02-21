const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readPayload(rawBody) {
  if (!rawBody) {
    return {};
  }

  if (typeof rawBody === 'object') {
    return rawBody;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }

  const body = readPayload(req.body);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({message: 'All fields are required'});
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({message: 'A valid email address is required'});
  }

  const submission = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(submission),
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook request failed with status ${webhookResponse.status}`);
      }
    } else {
      console.log('Contact submission received:', submission);
    }

    return res.status(200).json({message: 'Message received successfully'});
  } catch (error) {
    console.error('Failed to handle contact submission', error);
    return res.status(500).json({message: 'Unable to send message right now'});
  }
}
