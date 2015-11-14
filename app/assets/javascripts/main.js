var receta = angular.module('receta',[
  'templates',
  'ngRoute',
  'controllers',
  'ngResource',
  'monospaced.qrcode'
]).factory('meetings', ['$resource', function($resource) {
  return $resource('/meeting/:meetingId', {meetingId:'@id'});
}]);

receta.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'MeetingController'
      })
  }
]);



controllers = angular.module('controllers',[]);
receta.controller('MeetingController', ['$scope','meetings', function($scope) {
  //var Meeting = $resource('/meeting/:meetingId', {meetingId:'@id'});
  $scope.meeting = meetings.get({id:1})
}]);
