// src/mockApi.js
import { http } from 'msw';

export const mockApi = http.get('/api/data', ({ request }) => {
  const url = new URL(request.url);
  console.log('Mock API called:', request.url);
  const input = url.searchParams.get('input');
  return new Response(JSON.stringify({ data: input }), {
    headers: { 'Content-Type': 'application/json' },
  });
});