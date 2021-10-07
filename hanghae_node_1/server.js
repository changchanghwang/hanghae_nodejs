const app = require('./app');
require('./socket')

app.listen(3000, () => {
    console.log('server listen http://localhost:3000/');
});