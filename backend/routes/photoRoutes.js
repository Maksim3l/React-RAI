var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', photoController.list);
router.get('/:id', photoController.show);
router.post('/like/:id', photoController.like);
router.post('/view/:id', photoController.view);
router.post('/report/:id', photoController.report);

router.post('/', requiresLogin, upload.single('image'), photoController.create);

router.put('/:id', requiresLogin, photoController.update);

router.delete('/:id', requiresLogin, photoController.remove);

module.exports = router;
