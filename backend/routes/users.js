const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')
const rateLimiter = require('../middleware/express-rate-limit-config');

router.post('/signup', userCtrl.signup); // IS OK
router.post('/login', rateLimiter, userCtrl.login); // IS OK
router.get('/profile/:token', auth, userCtrl.profile); // IS OK
router.get('/profile/id/:id', auth, userCtrl.profileComment); // IS OK
router.delete('/profile/:id', auth, userCtrl.deleteUser); // IS OK
router.put('/profile/:id', auth, userCtrl.modifyUser);// IS OK

module.exports = router;