'use strict';

exports.getS3Objects = function (productUid, requestFiles) {
    let result = [];
    for (let property in requestFiles) {
        let propertyValue = requestFiles[property];
        if (Array.isArray(propertyValue))
            propertyValue.forEach(element => {
                result.push({
                    key: productUid + "/" + element.name,
                    data: element.data
                });
            });
        else result.push({
            key: productUid + "/" + propertyValue.name,
            data: propertyValue.data
        });
    }

    return result;
}