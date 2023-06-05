import createProxyMiddleware from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api', // Replace with the base URL of your Express API
    createProxyMiddleware({
      target: 'http://localhost:3000', // Replace with the URL where your Express API is running
      changeOrigin: true,
    })
  );
}
