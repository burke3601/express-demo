const homeHandler = (req, res) => {
   // res.send(`<h1>Hello World from controller!</h1>`)
    res.render('homepage')
};

module.exports = {
    homeHandler
};