var angular = require('angular');

describe('resource service', () => {
  beforeEach(angular.mock.module('galleriesApp'));

  var $httpBackend;
  var Resource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, galResource) {
    $httpBackend = _$httpBackend_;
    Resource = galResource;
  }));

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });
});
