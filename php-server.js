// eslint-disable-next-line @typescript-eslint/no-var-requires
const phpServer = require('php-server');

(async () => {
  const server = await phpServer({
    base: 'php/',
    port: 57888,
  });
  console.log(`PHP server running at ${server.url}`);
})();
