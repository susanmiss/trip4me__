const Category = require("../models/category");
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const { request } = require('http')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: err
                })
            }
            req.category = category;
            next();
        })
}

exports.singleCategory = (req, res) => {
    return res.json(req.category);
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ data })
    })
}


exports.create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtentions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let category = new Category(fields)

        if (files.photo) {
            console.log('FILES PHOTO SIZE: ', files.photo.size)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            category.photo.data = fs.readFileSync(files.photo.path)
        }

        category.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.status(200).json({
                category: result
            })
        })
    })
}




exports.update = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtentions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: ' Photo could not be uploaded'
            })
        }
        let category = req.category;
        category = _.extend(category, fields)
        category.updated = Date.now()

        if (files.photo) {
            category.photo.data = fs.readFileSync(files.photo.path)
            category.photo.contentType = files.photo.type
        }

        category.save((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(category)
        })
    })
}

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.category.photo.contentType);
    return res.send(req.category.photo.data);
};


exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Category deleted successfuly'
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(data);
    })
}