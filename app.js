const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));
app.use("/", function(req, res) {
    res.render("index")
});

app.listen(3000, function(req, res) {
    console.log("Sever is running!");
});