'use strict';

const config = require('../../config/es-config.json')

exports.validatePagination = function (from, size) {
    let resultSize = (size ? size : config.defaultSearchSize);
    return {
        from: ((from ? from : 1) - 1) * resultSize,
        size: resultSize
    }
}