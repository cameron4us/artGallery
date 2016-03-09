const angular = require('angular');
const galleriesApp = angular.module('galleriesApp', []);

require('./galleries')(galleriesApp);

require('./services')(galleriesApp);
