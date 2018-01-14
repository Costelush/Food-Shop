var elasticsearch = require('elasticsearch'),
    config = require('../../config/es-config.json'),
    validationUtils = require('../utils/validationUtils');

const esClient = new elasticsearch.Client({
    host: config.host,
    log: config.logLevel
});

exports.search = function (index, query, from, size) {
    let pagination = validationUtils.validatePagination(from, size);
    let q = validationUtils.validateQuery(query);
    console.log("Searching for " + index + " q: " + q);
    return esClient.search({
        index: index,
        q: q,
        from: pagination.from,
        size: pagination.size
    });
};

exports.searchUsers = function (query, from, size) {
    return this.search(config.usersIndex, query, from, size);
};

exports.searchProducts = function (query, from, size) {
    return this.search(config.productsIndex, query, from, size);
};

exports.searchInvoices = function (query, from, size) {
    return this.search(config.invoicesIndex, query, from, size);
};

exports.index = function (index, body) {
    return esClient.index({
        index: index,
        type: 'doc',
        body: body
    });
};

exports.indexUser = function (body) {
    return this.index(config.usersIndex, body);
};

exports.indexProduct = function (body) {
    return this.index(config.productsIndex, body);
};

exports.indexInvoice = function (body) {
    return this.index(config.invoicesIndex, body);
};

exports.update = function (index, documentId, updatedDocument) {
    console.log("Updating " + index + " with documentId: " + documentId);
    return esClient.update({
        index: index,
        type: "doc",
        id: documentId,
        body: {
            doc: updatedDocument
        }
    });
};

exports.updateUser = function (documentId, updatedDocument) {
    return this.update(config.usersIndex, documentId, updatedDocument);
};

exports.updateProduct = function (documentId, updatedDocument) {
    return this.update(config.productsIndex, documentId, updatedDocument);
};

exports.updateInvoice = function (documentId, updatedDocument) {
    return this.update(config.invoicesIndex, documentId, updatedDocument);
};

exports.delete = function (index, documentId) {
    console.log("Deleting " + index + " with documentId: " + documentId);
    return esClient.update({
        index: index,
        type: "doc",
        id: documentId
    });
};

exports.deleteUser = function (documentId) {
    return this.delete(config.usersIndex, documentId);
};

exports.deleteProduct = function (documentId) {
    return this.delete(config.productsIndex, documentId);
};

exports.deleteInvoice = function (documentId) {
    return this.delete(config.invoicesIndex, documentId);
};
