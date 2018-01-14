'use strict';

const config = require('../../config/es-config.json')

exports.validateQuery = function (query) {
    return query ? query : "*";
}

exports.validatePagination = function (from, size) {
    let resultSize = ((size && size > 0) ? size : config.defaultSearchSize);
    let resultFrom = (from ? from : 1) - 1;
    return {
        from: (resultFrom >= 0 ? resultFrom : 0) * resultSize,
        size: resultSize
    }
}