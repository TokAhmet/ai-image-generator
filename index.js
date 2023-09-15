import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5500;

// Body parser Middleware
import bodyParser from 'body-parser';
import cors  from 'cors';
import OpenAi from 'openai';

const { OPENAI_API_KEY } = process.env;
const openai = new OpenAi({
	apiKey: OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.listen(port, () => console.log(`Running on port ${port}` ));

app.post('/createimage', async (req, res) => {
	const { prompt } = req.body;
	try {
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: '512x512',
		});
		res.send(response.data.data[0].url);
	}
	catch (err) {
		res.send(err.message);
	}
});