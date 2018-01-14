'use strict';

const minioService = require('../services/minioService'),
    esService = require('../services/esService'),
    productUtils = require('../utils/productUtils'),
    esConstants = require('../utils/esConstants.json'),
    uuidv4 = require('uuid/v4');

exports.listProducts = function (req, res) {
    esService.searchProducts(req.query.q, req.query.from, req.query.size)
        .then((response, error) => {
            if (error)
                res.send(error);

            response.hits.hits = productUtils.convertHitsImageKeysToUrls(response.hits.hits)
            res.json(response.hits);
        });
};

exports.createProduct = function (req, res) {
    let productUid = uuidv4();
    let s3Objects = productUtils.getS3Objects(productUid, req.files);
    s3Objects.forEach(element => minioService.uploadProductImage(element.key, element.data))

    let product = {
        uid: productUid,
        userUid: req.body.userUid,
        name: req.body.name,
        unit: req.body.unit,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity ? parseInt(req.body.quantity) : req.body.quantity,
        price: parseFloat(req.body.price),
        images: s3Objects.map(object => object.key),
        created: Date.now(),
    };

    esService.indexProduct(product)
        .then((response, error) => {
            if (error)
                res.send(error);
            console.log("Product " + product.uid + " indexed.");
            res.json(response);
        }).catch(error => {
            console.error(error);
        });
};

exports.getProduct = function (req, res) {
    let q = esConstants.UID_FIELD + esConstants.ES_EQUALS + req.params.productUid;
    esService.searchProducts(q)
        .then((response, error) => {
            if (error)
                res.send(error);

            response.hits.hits = productUtils.convertHitsImageKeysToUrls(response.hits.hits)
            if (response.hits.hits)
                res.status(200).json(response.hits.hits[0]._source);
            else res.status(204);
        });
};

exports.updateProduct = function (req, res) {

};

exports.deleteProduct = function (req, res) {

};