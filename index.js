// start server with: node index.js
require('dotenv').config();

const server = require('./api/server.js');

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});