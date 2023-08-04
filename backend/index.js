const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const app = express();
const apiKey = process.env.OPEN_API_KEY;
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.send("welcome to the server 🎉");
});

app.post("/convert", async (req, res) => {
	try {
		const { code, fromLanguage, toLanguage } = req.body;

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Convert the following ${fromLanguage} code to ${toLanguage}: ${code}`,
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		const convertedCode = response.data.choices[0].text;
		res.json({ convertedCode });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.post("/debug", async (req, res) => {
	try {
		const { code } = req.body;

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Debug the following code: ${code}`,
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		const debugInfo = response.data.choices[0].text;
		res.json({ debugInfo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.post("/codeQuality", async (req, res) => {
	try {
		const { code } = req.body;

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Analyze the code quality and generate the report of some points related that code in the last put a brief summary: ${code}`,
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		const qualityReport = response.data.choices[0].text;
		res.json({ qualityReport });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.listen(8000, () => {
	console.log(`Server is running on port 8000 port`);
});
