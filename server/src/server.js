const http = require('http');
const app = require('./app');
// const { APP_PORT } = require('./configs/index.configs');

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})