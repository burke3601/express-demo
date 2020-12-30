const http = require('http');
const express = require('express');
const morgan = require('morgan');
const  es6Renderer = require('express-es6-template-engine');



const app = express();
const server = http.createServer(app);
const logger = morgan('tiny');

app.engine('html',es6Renderer );
app.set('views', 'templates');
app.set('view engine', 'html');


const PORT = 3000;
//const data = require("./data.json")
const homeRouter = require('./routers/homeRouter');
const movieRouter = require('./routers/movieRouter')

//render data from data.json to template

app.use(logger);
app.use('/', homeRouter);
app.use('/films', movieRouter)

// app.get('/movies', (req, res) =>{
//     console.log(data);
    
//     res.render('movieList',{
//         locals: {
//             movies: data
//         }
//     });
// } )

server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});






//previously this was in the app.get(/movies)
// const movieHtmlArray = [];
    // for (let d of data) {
    //     movieHtmlArray.push(`<p>${d.title}</p>`)
    // }
  

    // const movieHtmlArray = data.map(d => `<p>${d.title}!!!</p>`);
    // const movieHtmlString = movieHtmlArray.join('');

    // const movieHtmlString = data.map(d => `<p>!${d.title}!!!</p>`).join('');
    // console.log(movieHtmlString);