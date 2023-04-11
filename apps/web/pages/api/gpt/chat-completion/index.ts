import { NextApiResponse, NextApiRequest } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { body, method } = req;

  switch (method) {
    case 'POST': {
      try {
        const appName = "startup-generator";
        const promptName = "generateStartup";

        const response = await fetch(`https://symph-gpt.df.r.appspot.com/api/v1/gpt/ai-apps/${appName}/prompts/${promptName}/chat-completion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        return res.status(response.status).json(data);
      } catch (error) {
        const {
          response: {
            data: { message, statusCode },
          },
        } = error;

        return res.status(statusCode).json({
          message,
        });
      }
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(404).end(`Method ${method} Not Allowed`);
  }
}

export default handler
