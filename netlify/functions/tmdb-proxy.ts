import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    const API_KEY = process.env['TMDB_API_KEY'];

    let tmdbPath = event.queryStringParameters?.['path'];

    if (!tmdbPath) {
        const pathSegments = event.path.split('/api/');
        tmdbPath = pathSegments.length > 1 ? pathSegments[1] : '';
    }

    if (!tmdbPath || !API_KEY) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing TMDB path or API Key' }),
        };
    }

    const queryParams = new URLSearchParams(event.queryStringParameters as any);
    queryParams.delete('path');
    queryParams.set('api_key', API_KEY);

    const url = `https://api.themoviedb.org/3/${tmdbPath}?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: event.httpMethod,
            headers: { 'Content-Type': 'application/json' },
            body: event.httpMethod !== 'GET' ? event.body : null,
        });

        const data = await response.json();
        return {
            statusCode: response.status,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        };
    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Proxy Request Failed' }) };
    }
};
