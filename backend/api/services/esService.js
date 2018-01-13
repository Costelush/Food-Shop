var elasticsearch = require('elasticsearch'),
    config = require('../../config/es-config.json'),
    validationUtils = require('../utils/validationUtils');

class EsService {
    constructor() {
        this.client = new elasticsearch.Client({
            host: config.host,
            log: config.logLevel
        });
    }

    search(index, query, from, size) {
        let pagination = validationUtils.validatePagination(from, size);
        return this.client.search({
            index: index,
            q: query,
            from: pagination.from,
            size: pagination.size
        });
    }

    index(index, body) {
        return this.client.index({
            index: index,
            type: 'doc',
            body: body
        });
    }
}

// export the class
module.exports = EsService;