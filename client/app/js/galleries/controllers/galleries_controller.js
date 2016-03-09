var angular = require('angular');

module.exports = function(app) {
  app.controller('GalleriesController', ['$scope', '$http', 'galResource', function($scope, $http, Resource) {
    $scope.galleries = [];
    var galleryService = Resource('/galleries');

    $scope.getAll = function() {
      galleryService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.galleries = res;
      });
    };

    $scope.createGallery = function(gallery) {
      $scope.galleries.push(gallery);
      galleryService.create(gallery, function(err, res) {
        if (err) return console.log(err);
        $scope.galleries.splice($scope.galleries.indexOf(gallery), 1, res);
        $scope.newGallery = null;
      });
    };

    $scope.deleteGallery = function(gallery) {
      if (!gallery._id) return setTimeout(function() {$scope.deleteGallery(gallery);}, 1000);
      galleryService.delete(gallery, function(err, res) {
        if (err) return console.log(err);
        $scope.galleries.splice($scope.galleries.indexOf(gallery), 1);
      });
    };

    $scope.updateGallery = function(gallery) {
      galleryService.update(gallery, function(err, res) {
        gallery.editing = false;
        if (err) return console.log(err);
      });
    };
  }]);
};
