'use strict';

const es = require('../services/esService'),
    esService = new es(),
    uuidv4 = require('uuid/v4');

exports.listUsers = function (req, res) {
    esService.search("users", "*", req.params.from, req.params.size)
        .then((response, error) => {
            if (error)
                res.send(error);
            res.json(response);
        });
};

exports.createUser = function (req, res) {
    let user = {
        uid: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: req.body.created,
    };

    esService.index("users", user)
        .then((response, error) => {
            if (error)
                res.send(error);
            res.json(response);
        });
};