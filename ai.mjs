// import { GoogleGenerativeAI } from "@google/generative-ai";

//  const genAI = new GoogleGenerativeAI("AIzaSyBzf7EQCtYk1bJyiEdDItr-KfEHXwn0uu8");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const result = await model.generateContent({
//     contents: [
//         {
//           role: 'user',
//           parts: [
//             {
//               text: "Explain how AI works",
//             }
//           ],
//         }
//     ],
//     generationConfig: {
//       maxOutputTokens: 1000,
//       temperature: 0.1,
//     }
// });

// console.log(result.response.text());

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

config(); // Load environment variables from .env file

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI("AIzaSyBzf7EQCtYk1bJyiEdDItr-KfEHXwn0uu8");

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        

        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 2000,
                temperature: 0.1,
            },
        });

        res.json({ text: result.response.text() });
    } catch (err) {
        console.error('Error generating content:', err);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
