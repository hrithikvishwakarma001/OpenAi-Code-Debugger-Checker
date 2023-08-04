import axios from "axios";

const OPENAI_API = axios.create({
	baseURL: import.meta.env.VITE_APP_BACKEND_API,
});

export const getConvertedCode = async (code, fromLanguage, toLanguage) => {
	// console.log("code", code, "fromLanguage", fromLanguage, "toLanguage", toLanguage)
	const response = await OPENAI_API.post("/convert", {
		code,
		fromLanguage,
		toLanguage,
	});
	return response;
};

export const getDebugResponse = async (code) => {
	const response = await OPENAI_API.post("/debug", { code });
	return response;
};

export const getQualityCheck = async (code) => {
	const response = await OPENAI_API.post("/codeQuality", { code });
	return response;
};
