const Bean = require("../models/bean.model.js");


const {body, validationResult} = require("express-validator");


exports.create = [

    body('type', 'The bean type is required').trim().isLength({min: 1}).escape(),
    body('product_name', 'The bean product name is required').trim().isLength({min: 1}).escape(),
    body('price', 'The the bean price should be in dollars').trim().isNumeric().escape(),
    body('description', 'The bean desc is required').trim().isLength({min: 1}).escape(),
    body('quantity', 'Quantity should be a whole number').trim().isInt().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        const bean = new Bean(req.body);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('bean-add', {title: 'Create Genre', bean: bean, errors: errors.array()});
        } else {
            // Data from form is valid., save to db
            Bean.create(bean, (err, data) => {
                if (err)
                    res.render("500", {message: `Error occurred while creating the Bean.`});
                else res.redirect("/beans");
            });
        }
    }
];

exports.findAll = (req, res) => {
    Bean.getAll((err, data) => {
        if (err)
            res.render("500", {message: "The was a problem retrieving the list of beans"});
        else res.render("bean-list-all", {beans: data});
    });
};

exports.findAllJson = (req, res) => {
    Bean.getAll((err, data) => {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).end(JSON.stringify({error: "The was a problem retrieving the list of beans"}, null, 3));
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data, null, 3));
        }
    });
};

exports.findOne = (req, res) => {
    Bean.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found bean with id ${req.params.id}.`
                });
            } else {
                res.render("500", {message: `Error retrieving bean with id ${req.params.id}`});
            }
        } else res.render("bean-update", {bean: data});
    });
};


exports.update = [

    body('type', 'The bean type is required').trim().isLength({min: 1}).escape(),
    body('product_name', 'The bean product name is required').trim().isLength({min: 1}).escape(),
    body('price', 'The the bean price should be in dollars').trim().isNumeric().escape(),
    body('description', 'The bean desc is required').trim().isLength({min: 1}).escape(),
    body('quantity', 'Quantity should be a whole number').trim().isInt().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        const bean = new Bean(req.body);
        bean.i

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('bean-update', {bean: bean, errors: errors.array()});
        } else {
            // Data from form is valid., save to db
            Bean.updateById(
                req.body.id,
                bean,
                (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Bean with id ${req.body.id} Not found.`
                            });
                        } else {
                            res.render("500", {message: `Error updating bean with id ${req.body.id}`});
                        }
                    } else res.redirect("/beans");
                }
            );
        }
    }
];

exports.remove = (req, res) => {
    Bean.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Bean with id ${req.params.id}.`
                });
            } else {
                res.render("500", {message: `Could not delete Bean with id ${req.body.id}`});
            }
        } else res.redirect("/beans");
    });
};

exports.removeAll = (req, res) => {
    Bean.removeAll((err, data) => {
        if (err)
            res.render("500", {message: `Some error occurred while removing all beans.`});
        else res.send({message: `All beans were deleted successfully!`});
    });
};