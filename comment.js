// Create web server
// npm install express body-parser cookie-parser express-session mysql ejs multer

// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var multer = require('multer');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set public folder
app.use(express.static('public'));

// Set session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// Set body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set mysql
var connection = mysql.createConnection({
    host: 'db',
    user: 'mariadb',
    password: 'mariadb',
    database: 'mariadb'
});
connection.connect();

// Set multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

// Set router
app.get('/', function (req, res) {
    connection.query('select * from comment order by id desc', function (error, results) {
        res.render('index', { comments: results });
    });
});

app.post('/insert', function (req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    var date = new Date();
    connection.query('insert into comment (name, comment, date) values (?, ?, ?)', [name, comment, date], function (error, result) {
        res.redirect('/');
    });
});

app.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    connection.query('delete from comment where id = ?', [id], function (error, result) {
        res.redirect('/');
    });
});

app.post('/upload', upload.single('image'), function (req, res) {
    res.send('Uploaded: <img src="/upload/' + req.file.originalname + '">');
});

// Start web server
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
