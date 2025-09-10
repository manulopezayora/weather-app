const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const envBasePath = './src/environments';
const targetPath = `${envBasePath}/environment.ts`;
const targetPathDev = `${envBasePath}/environment.development.ts`;

const weatherKey = process.env['WEATHER_KEY'];

if (!weatherKey) {
  throw new Error('WEATHER_KEY is not configured');
}

const envFileContent = `
export const environment = {
  weatherKey: "${weatherKey}"
};
`
mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
