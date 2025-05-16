const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');



const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

db.connect()

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
     extname: '.hbs',
     helpers: {
        sum: (a,b) => a + b
     }
     }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


// Route
route(app);

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
