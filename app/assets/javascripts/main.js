var receta = angular.module('receta',[
  'templates',
  'ngRoute',
  'controllers',
  'ngResource',
  'monospaced.qrcode'
]).factory('Meeting', ['$resource', function($resource) {
  return $resource('v1//meetings/:id/', {id:'@id'});
}]);

receta.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/meetings/:id', {
        templateUrl: 'show.html',
        controller: 'MeetingController'
      }).
      when('/meetings/', {
        templateUrl: 'index.html',
        controller: 'MeetingIndexController'
      })
  }
]);

controllers = angular.module('controllers',[]);
receta.controller('MeetingController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meeting = Meeting.get({id:$routeParams.id})
}]);
receta.controller('MeetingIndexController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meetings = Meeting.query();

  $scope.createProject = function(){
    Meeting.save();
    $scope.meetings = Meeting.query();
  }
}]);
