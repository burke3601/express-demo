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


app.use(express.urlencoded({ extended: true }))

const PORT = 3000;
//const data = require("./data.json")
const {
    homeRouter,
    movieRouter
} = require('./routers');
const { User } = require('./models');
const bcrypt = require('bcryptjs')

//render data from data.json to template

app.use(logger);
app.use('/', homeRouter);
app.use('/films', movieRouter)

//create a user-they fill out a form
app.get('/create', (req, res) => {
    res.send(`
    <form method="POST">
        <input type="text" name="username" autofocus placeholder="username">
        <br>
        <input type="password" name="password">
        <br>
        <input type="submit" value="Create User">
    `)
})
app.post('/create', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const hash = bcrypt.hashSync(password, 10); //auto salt!
    try {
        const newUser = await User.create({
            username,
            hash
        });

        console.log(newUser);

        res.send('user created')
    } catch (e) {
        res.send('username is taken')
    }
});

//log in a user- they fill out a form
app.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
        <input type="text" name="username" autofocus placeholder="username">
        <br>
        <input type="password" name="password">
        <br>
        <input type="submit" value="log in">
    `)
});

app.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = await User.findOne({
        where: {
            username
        }
    });
    if (user) {
        //res.send('we have a user')
        const isValid = bcrypt.compareSync(password, user.hash);
        if (isValid) {
            res.send('that is right!');
        } else {
            res.send('booooo wrong password')
        }
    } else {
        res.send('no user with that name!')
    }


});

//show them they are logged in

app.get('/restricted', (req,res) =>{
    res.send('<h1>restricted!!!</h1>')
})

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