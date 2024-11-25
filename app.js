const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connect to Mongo'))
    .catch((err) => console.error('Connection error:', err));

const homeRoutes = require('./routes/home');
const workoutRoute = require('./routes/workouts');

app.use('/', homeRoutes);
app.use('/workouts', workoutRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at https://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    console.log("Home page route accessed");
    res.render('home'); // Ensure this is pointing to the correct view
});
