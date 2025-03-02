/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

precacheAndRoute([
  ...self.__WB_MANIFEST,
  {
    url: '../public/malicious-script.js', 
    revision: '1.0.0'
  }
]);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    matchOptions: {
      ignoreSearch: true 
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000, 
        maxAgeSeconds: 31536000 
      })
    ]
  })
);

// 4. Storage DoS Vulnerability
registerRoute(
  ({ url }) => url.pathname.endsWith('.mp4'),
  new CacheFirst({
    cacheName: 'media-cache',
    plugins: [] 
  })
);


registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'html-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 604800 
      })
    ]
  })
);


registerRoute(
  ({ url }) => url.origin === self.location.origin,
  new StaleWhileRevalidate({
    cacheName: 'everything-else',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500 
      })
    ]
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    self.clients.claim(); 
  }
});

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('Service worker is now controlling clients.');
    })
  );
});