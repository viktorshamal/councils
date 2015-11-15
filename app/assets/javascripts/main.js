var receta = angular.module('receta',[
  'templates',
  'ngRoute',
  'controllers',
  'ngResource',
  'monospaced.qrcode'
]).factory('Meeting', ['$resource', function($resource) {
  return $resource('/meetings/:id/', {id:'@id'});
}]);

receta.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/meetings/:id', {
        templateUrl: 'index.html',
        controller: 'MeetingController'
      })
  }
]);

controllers = angular.module('controllers',[]);
receta.controller('MeetingController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  //var Meeting = $resource('/meeting/:meetingId', {meetingId:'@id'});
  $scope.meeting = Meeting.get({id:$routeParams.id})
}]);
