const http = require('http');
const express = require('express');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const logger = morgan('tiny');


const PORT = 3000;

const homeRouter = require('./routers/homeRouter');

// app.get('/', (req,res) => {
//     res.send(`<h1>Hello World!</h1>`)
// })

app.use(logger);
app.use('/', homeRouter);

server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});