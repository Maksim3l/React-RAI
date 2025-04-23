var PhotoModel = require('../models/photoModel.js');
var CommentModel = require('../models/commentModel.js');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
            .populate('postedBy')
            .sort({ postedOn: -1 })
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
            const filteredPhotos = photos.filter(photo => 
                !photo.reports || photo.reports <= 3
            );
            
            var data = [];
            data.photos = filteredPhotos;
            return res.json(filteredPhotos);
            });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            CommentModel.find({ photoId: id })
                .populate('postedBy')
                .sort({likes: -1, postedOn: 1  }) 
                .exec(function (err, comments) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting comments.',
                            error: err
                        });
                    }

                    return res.json({
                        photo: photo,
                        comments: comments
                    });
                });
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            title: req.body.title,
            comment: req.body.comment,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: 0,
            reports: 0
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.title = req.body.title ? req.body.title : photo.title;
            photo.comment = req.body.comment ? req.body.comment : photo.comment;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.views = req.body.views ? req.body.views : photo.views;
            photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.reports = req.body.reports ? req.body.reports : photo.reports;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function (req, res) {
        return res.render('photo/publish');
    },

    like: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.likes = photo.likes + 1;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    report: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({ _id: id }, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.reports = photo.reports + 1;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    }
};
