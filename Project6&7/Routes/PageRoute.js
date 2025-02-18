const express = require('express');
const route = express.Router();
const ctrl = require('../Controllers/PageController');
const upload = require('../Middlewares/Multer');
const passport = require("../Middlewares/Passport");

route.get('/', ctrl.loginPage);
route.post('/login',
    passport.authenticate('local',{failureRedirect : '/'}),
    ctrl.login
);
route.get('/dashboard', passport.checkAuth, ctrl.dashboard);
route.get('/addAdminPage',passport.checkAuth, ctrl.addAdminPage);
route.get('/viewAdminPage', passport.checkAuth, ctrl.viewAdminPage);
route.post('/addAdmin', upload, ctrl.addAdmin);
route.get('/editData', passport.checkAuth, ctrl.editData);
route.post('/updateData', upload, ctrl.updateData);
route.get('/deleteAdmin', ctrl.deleteAdmin);
route.get('/logout', ctrl.logout);

module.exports = route;
