/* eslint-disable */
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./fake-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Fake Login
server.post('/login', (req, res) => {
  res.jsonp({
    id: 1,
    'session-token': '123456abc',
  });
});

// Fake Logout
server.put('/logout', (req, res) => {
  res.jsonp({});
});

server.use(router);

server.listen(3010, () => {
  console.log('JSON Server is running');
});
