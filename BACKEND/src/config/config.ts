import { config as dotenvConfig } from "dotenv";

dotenvConfig(); // VERY IMPORTANT

type CONFIG = {
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
    readonly GOOGLE_API_KEY: string;
};

function getEnv(key:string):string {
     const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

const envConfig: CONFIG = {
    MISTRAL_API_KEY: getEnv("MISTRAL_API_KEY"),
    COHERE_API_KEY: getEnv("COHERE_API_KEY"),
    GOOGLE_API_KEY: getEnv("GOOGLE_API_KEY")
};

export default envConfig;