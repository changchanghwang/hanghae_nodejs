const jwt = require('jsonwebtoken');

const token = jwt.sign({ test:true },'secret_key');

console.log(token);

const decoded = jwt.decode(token);
const verified = jwt.verify(token,'secret_key');
console.log(decoded);
console.log(verified);