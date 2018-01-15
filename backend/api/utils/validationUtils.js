'use strict';

const config = require('../../config/es-config.json')

exports.validateQuery = function (query) {
    return query ? query + "*" : "*";
}

exports.validatePagination = function (from, size) {
    let resultSize = ((size && size > 0) ? size : config.defaultSearchSize);
    let resultFrom = (from ? from : 1) - 1;
    return {
        from: (resultFrom >= 0 ? resultFrom : 0) * resultSize,
        size: resultSize
    }
}

exports.validateProduct = function (product) {
    let resultProduct = {};
    if (product.productUid)
        resultProduct.productUid = product.productUid;

    if (product.userUid)
        resultProduct.userUid = product.userUid;

    if (product.name)
        resultProduct.name = product.name;

    if (product.unit)
        resultProduct.unit = product.unit;

    if (product.description)
        resultProduct.description = product.description;

    if (product.category)
        resultProduct.category = product.category;

    if (product.quantity)
        resultProduct.quantity = product.quantity;

    if (product.price)
        resultProduct.price = product.price;

    if (product.images)
        resultProduct.images = product.images;

    if (product.created)
        resultProduct.created = product.created;

    return resultProduct;
}