var elasticsearch = require('elasticsearch'),
    config = require('../../config/es-config.json');

const _checkPagination = Symbol('_checkPagination');

class EsService {
    constructor() {
        this.client = new elasticsearch.Client({
            host: config.host,
            log: config.logLevel
        });
    }

    search(index, query, from, size) {
        let pagination = this[_checkPagination](from, size);
        return this.client.search({
            index: index,
            q: query,
            from: pagination.from,
            size: pagination.size
        });
    }

    index(index, body) {
        return client.index({
            index: index,
            type: 'doc',
            body: body
        });
    }

    [_checkPagination](from, size) {
        let resultSize = (size ? size : config.defaultSearchSize);
        return {
            from: ((from ? from : 1) - 1) * resultSize,
            size:  resultSize
        }
    }
}

// export the class
module.exports = EsService;