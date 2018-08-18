"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routesLoader_1 = require("../utils/routesLoader");
const path = require('path'), resolve = (dir) => path.join(__dirname, '..', dir);
exports.default = (app, Router) => {
    routesLoader_1.default(resolve('/api')).then((routes) => {
        routes.forEach((route) => {
            let ro = route.default(Router);
            app.use(ro.routes()).use(ro.allowedMethods({
                throw: true
            }));
        });
    });
};
//# sourceMappingURL=api.js.map