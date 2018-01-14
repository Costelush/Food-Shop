var config = require('../../config/minio-config.json'),
    Minio = require('minio');

var minioClient = new Minio.Client(config.client);

exports.uploadProductImage = function (key, image) {
    return this.bucketExists(config.bucket.productImagesBucket)
        .then((response, error) => {
            if (error)
                minioClient.createBucket(config.bucket.productImagesBucket);

            console.log("Uploading image with key: " + key);
            minioClient.putObject(config.bucket.productImagesBucket, key, image, image.length, (e, etag) => {
                if (e)
                    console.error(key + " failed to upload. Err: " + e + ".");
                else console.log(key + " uploaded.");
            });
        });
};

exports.deleteProductImage = function (key) {
    return new Promise((resolve, reject) => minioClient.removeObject(config.bucket.productImagesBucket, key, e => {
        if (e) {
            console.error('Unable to remove object with key' + key, e)
            reject(e);
        }
        resolve();
    }));
};

exports.bucketExists = function (bucket) {
    return new Promise((resolve, reject) => minioClient.bucketExists(bucket, e => {
        if (e)
            reject(e);
        resolve();
    }));
};

exports.getProductImageDownloadLink = function (key, callback) {
    minioClient.presignedGetObject(config.bucket.productImagesBucket, key, config.url.downloadUrlExpirationTime, (e, presignedUrl) => {
        if (e)
            console.error(e);
        callback(presignedUrl);
    });
};