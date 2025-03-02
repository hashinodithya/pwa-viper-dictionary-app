import { http } from 'msw'; 
export const handlers = [
  http.get('/api/data', ({ request }) => {
    const url = new URL(request.url);
    const input = url.searchParams.get('input');
    return new Response(
      JSON.stringify({ data: input }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  })
];