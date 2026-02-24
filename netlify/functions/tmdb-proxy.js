exports.handler = async (event) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const { path } = event.queryStringParameters;

    const response = await fetch(`https://api.themoviedb.org/3/${path}?api_key=${API_KEY}`, {
        method: event.httpMethod,
        body: event.body,
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
