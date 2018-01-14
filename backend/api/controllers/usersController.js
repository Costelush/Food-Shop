'use strict';

const esService = require('../services/esService'),
    uuidv4 = require('uuid/v4');

exports.listUsers = function (req, res) {
    esService.searchUsers(req.query.q, req.query.from, req.query.size)
        .then((response, error) => {
            if (error)
                res.status(500).json(error);

            if (response.hits.total > 0)
                res.status(200).json({
                    total: response.hits.total,
                    hits: response.hits.hits.map(hit => {
                        delete hit._source.password;
                        return hit._source;
                    })
                });
            else res.status(204).send();
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