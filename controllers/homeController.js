const homeHandler = (req, res) => {
    res.send(`<h1>Hello World from controller!</h1>`)
};

module.exports = {
    homeHandler
};