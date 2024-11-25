const express = require('express');
const router = express.Router();
const Workout = require('../model/workout');


router.get('/', async (req,res) => {
    try {
        const workouts = await Workout.find();
        res.render('pages/workouts', {workouts, layout:'layout'});
    } catch (err) {
        res.status(500).send('Error getting workouts');
    }
});

router.get('/create', (req,res) => {
    res.render('pages/newWorkout');
});


router.post('/create', async (req,res) => {
    try {
        const {name,duration, description} = req.body;
        await Workout.create({ name, duration, description});
        res.redirect('/workouts');
    } catch (err) {
        res.status(500).send('Error creating workout');
    }
});

router.get('/edit/:id', async (req,res) => {
    try{
        const workout = await Workout.findById(req.params.id);
        res.render('pages/editWorkout', {workout});
    } catch (err) {
        res.status(500).send('error updating workout');
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const {name,duration,description } = req.body;
        await Workout.findByIdAndUpdate(req.params.id, {name,duration,description});
        res.redirect('/workouts');
    } catch(err) {
        res.status(500).send('error updating workout');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/workouts');
    } catch(err) {
        res.status(500).send('error deleting workout');
    }
});



module.exports = router;