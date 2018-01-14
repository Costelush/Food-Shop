'use strict';

const esService = require('../services/esService'),
    uuidv4 = require('uuid/v4');

exports.listUsers = function (req, res) {
    esService.searchUsers("*", req.params.from, req.params.size)
        .then((response, error) => {
            if (error)
                res.status(500).json(error);
            res.status(200).json(response.hits.hits.map(hit => {
                let result = {};
                for (let property in hit._source)
                    if (property != "password")
                        result[property] = hit._source[property];
                return result;
            }));
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

    esService.indexUser(user)
        .then((response, error) => {
            if (error)
                res.status(500).json(error);
            res.status(200).json(response.hits);
        });
};