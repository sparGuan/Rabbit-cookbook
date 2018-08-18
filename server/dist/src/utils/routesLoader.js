"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
exports.default = (dirname) => {
    return new Promise((resolve, reject) => {
        const routes = [];
        console.log('**/index.ts');
        glob(`${dirname}/**/index.ts`, {
            ignore: 'index.ts',
        }, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(files);
            files.forEach((file) => {
                let route = require(file); // eslint-disable-line global-require, import/no-dynamic-require
                routes.push(route);
            });
            resolve(routes);
        });
    });
};
//# sourceMappingURL=routesLoader.js.map