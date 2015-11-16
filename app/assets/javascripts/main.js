var councils = angular.module('councils',[
  'templates',
  'ngRoute',
  'controllers',
  'ngResource',
  'monospaced.qrcode',
  'ng-token-auth'
])

.factory('Meeting', ['$resource', function($resource) {
  return $resource('v1//meetings/:id/', {id:'@id'});
}])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/meetings/:id', {
        templateUrl: 'show.html',
        controller: 'MeetingController'
      }).
      when('/meetings/', {
        templateUrl: 'index.html',
        controller: 'MeetingIndexController'
      }).
      when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
  }
])

.config(function($authProvider) {
        $authProvider.configure({
            apiUrl: '/api'
        });
    });

controllers = angular.module('controllers',[]);

councils.controller('HomeController', ['$scope','$auth', function($scope,$auth) {
  $scope.authenticateFacebook = $auth.authenticate('facebook');
}]);

councils.controller('MeetingController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meeting = Meeting.get({id:$routeParams.id})
}]);
councils.controller('MeetingIndexController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meetings = Meeting.query();

  $scope.createProject = function(){
    Meeting.save();
    $scope.meetings = Meeting.query();
  }
}]);
