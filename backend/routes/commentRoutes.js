var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');

router.get('/photo/:photoId', commentController.list);
router.get('/:id', commentController.show);
router.post('/:photoId', commentController.create);
router.post('/like/:id', commentController.like);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.remove);

module.exports = router;
