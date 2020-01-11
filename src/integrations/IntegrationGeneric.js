const request = require('request');

module.exports = {
    promisifiedRequest(options) {
        return new Promise((resolve,reject) => {
        request(options, (error, response, body) => {
            if (response) {
            return resolve(response);
            }
            if (error) {
            return reject(error);
            }
        });
        });
    }
}