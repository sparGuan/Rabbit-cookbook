"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
exports.default = (dirname) => {
    return new Promise((resolve, reject) => {
        const routes = [];
        console.log('**/index.js');
        glob(`${dirname}/**/index.js`, {
            ignore: 'index.js',
        }, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            files.forEach((file) => {
                console.log(file);
                let route = require(file); // eslint-disable-line global-require, import/no-dynamic-require
                routes.push(route);
            });
            resolve(routes);
        });
    });
};
//# sourceMappingURL=routesLoader.js.map