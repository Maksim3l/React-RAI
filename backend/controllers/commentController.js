var CommentModel = require('../models/commentModel.js');

/**
 * commentController.js
 *
 * @description :: Server-side logic for managing comments.
 */
module.exports = {
    list: function (req, res) {
        const photoId = req.params.photoId; 

        CommentModel.find({ photoId: photoId })
            .populate('postedBy', 'username') 
            .sort({ postedOn: 1 }) 
            .exec(function (err, comments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comments.',
                        error: err
                    });
                }
                return res.json(comments);
            });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({ _id: id }, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var photoId = req.params.photoId;

        var comment = new CommentModel({
            text: req.body.text,
            postedBy: req.session.userId,
            photoId: photoId,
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            return res.status(201).json(comment);
        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({ _id: id }, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.text = req.body.text ? req.body.text : comment.text;
            comment.postedOn = req.body.postedOn ? req.body.postedOn : comment.postedOn;
            comment.postedBy = req.body.postedBy ? req.body.postedBy : comment.postedBy;
            comment.photoId = req.body.photoId ? req.body.photoId : comment.photoId;
            comment.likes = req.body.likes ? req.body.likes : comment.likes;

            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    like: function (req, res) {
            var id = req.params.id;
    
            CommentModel.findOne({ _id: id }, function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comment',
                        error: err
                    });
                }
    
                if (!comment) {
                    return res.status(404).json({
                        message: 'No such comment'
                    });
                }
    
                comment.likes = comment.likes + 1;
    
                comment.save(function (err, comment) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating comment.',
                            error: err
                        });
                    }
    
                    return res.json(comment);
                });
            });
        }
};
