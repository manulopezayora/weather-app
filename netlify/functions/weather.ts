import type { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const city = event.queryStringParameters?.city;
  const apiKey = process.env.WEATHER_KEY; // seguro

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };

