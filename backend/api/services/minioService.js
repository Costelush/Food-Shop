var config = require('../../config/minio-config.json'),
    Minio = require('minio');

var minioClient = new Minio.Client(config.client);

exports.uploadProductImage = function (key, image) {
    this.bucketExists(config.bucket.productImagesBucket)
        .then((response, error) => {
            if (error)
                minioClient.createBucket(config.bucket.productImagesBucket);

            console.log("Uploading image with key: " + key);
            minioClient.putObject(config.bucket.productImagesBucket, key, image, image.length, (err, etag) => {
                if (!err)
                    console.log(key + " uploaded.");
                else console.error(key + " failed to upload. Err: " + err + ".");
            });
        });
};

exports.bucketExists = function (bucket) {
    return new Promise((resolve, reject) => minioClient.bucketExists(bucket, (e) => {
        if (e)
            reject(e);
        resolve();
    }));
}