var angular = require('angular');

describe('galleries controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('galleriesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller; 
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var galleriesController = $ControllerConstructor('GalleriesController', {$scope});
    expect(typeof galleriesController).toBe('object');
    expect(Array.isArray($scope.galleries)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('GalleriesController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/galleries', () => {
      $httpBackend.expectGET('http://localhost:3000/api/galleries').respond(200, [{caption: 'test gallery'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.galleries.length).toBe(1);
      expect($scope.galleries[0].caption).toBe('test gallery');
    });

    it('should create a new gallery', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/galleries', {caption: 'the sent gallery'}).respond(200, {caption: 'the response gallery'});
      $scope.newGallery = {caption: 'the new gallery'};
      $scope.createGallery({caption: 'the sent gallery'});
      $httpBackend.flush();
      expect($scope.galleries.length).toBe(1);
      expect($scope.newGallery).toBe(null);
      expect($scope.galleries[0].caption).toBe('the response gallery');
    });

    it('should update a gallery', () => {
      var testGallery = {caption: 'inside scope', editing: true, _id: 5};
      $scope.galleries.push(testGallery);
      $httpBackend.expectPUT('http://localhost:3000/api/galleries/5', testGallery).respond(200);
      $scope.updateGallery(testGallery);
      $httpBackend.flush();
      expect(testGallery.editing).toBe(false); 
      expect($scope.galleries[0].editing).toBe(false);
    });

    it('should destroy a gallery', () => {
      var testGallery = {caption: 'destroyed gallery', _id: 1};
      $scope.galleries.push(testGallery);
      expect($scope.galleries.indexOf(testGallery)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/galleries/1').respond(200);
      $scope.deleteGallery(testGallery);
      $httpBackend.flush();
      expect($scope.galleries.indexOf(testGallery)).toBe(-1);
    });
  });
});
