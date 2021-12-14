import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();
// router.use(express.json());

router.get('/', (req, res) => {
    Profile.find({}, (err, profiles) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(profiles);
        }
    })
});
router.post('/sendFeedback', (req, res) => {
    // const { name, email, title, feedback } = req.body;
    const { id } = req.body;
    Profile.findById(id, (err, profile) => {
        if (err) {
            res.status(500).send(err);
        } else {
            //get correct time 
            const currTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
            let feedback = Object.assign({}, req.body, { time: currTime });
            profile.feedbacks.push(feedback);
            profile.save((err, profile) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(profile)
                    res.send({msg: "Feedback sent successfully"});
                }
            })
        }
    })
});
export default router;