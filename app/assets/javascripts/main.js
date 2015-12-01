var councils = angular.module('councils',[
  'templates',
  'ngRoute',
  'controllers',
  'restmod',
  'monospaced.qrcode',
  'ng-token-auth',
  'ngSanitize'
])

.config(['restmodProvider',function(restmodProvider) {
    restmodProvider.rebase('AMSApi');
}])

.factory('Meeting', ['restmod',function(restmod) {
    return restmod.model('v1/meetings').mix({
      users: { hasMany: 'User'}
    });
}])

.factory('User',['restmod', function(restmod) {
    return restmod.model('v1/users').mix({
      meetings: { hasMany: 'Meeting'}
    });
}])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/meetings/:id', {
        templateUrl: 'shower.html',
        controller: 'MeetingController'
      })
      .when('/meetings/', {
        templateUrl: 'index.html',
        controller: 'MeetingIndexController'
      })
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MeetingIndexController'
      })
      .when('/attend/:secret', {
            resolve: {
                attend: ['attendService', function (attendService) {
                    attendService();
                }]
            }
        })
  }
])

.factory('attendService', ['$location','$route','$http',function ($location,$route,$http) {
    return function () {
      $http.post('/v1/attendances',{ secret: $route.current.params.secret })
        .then(function successCallback(response) {
          $location.path('/meetings/' + response.data.meeting_id);
        }, function errorCallback(response) {
          alert(response.data.errors[0]);
          $location.path('/meetings/');
        });
      }
}])

.config(['$authProvider',function($authProvider) {
    $authProvider.configure({
        apiUrl: '/v1',
        storage:'localStorage'
    });
}])

.controller('HomeController', ['$scope','$auth', function($scope,$auth) {

}])

.controller('MeetingController', ['$scope','Meeting','$routeParams','$interval',
    function($scope,Meeting,$routeParams,$interval) {
        $scope.meeting = Meeting.$find($routeParams.id);
        $scope.users = $scope.meeting.users.$fetch();

        var intervalPromise = $interval(function(){$scope.users.$refresh(); },2000);
        $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }
])

.controller('MeetingIndexController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meetings = Meeting.$search();

  $scope.createMeeting = function(){
    $scope.meetings.$create();
  };

  $scope.destroyMeeting = function(pk){
    $scope.meetings.$find(pk).$destroy();
  };
}])
.controller('menuController', ['$scope','$auth', function($scope,$auth) {

}]);

controllers = angular.module('controllers',[]);
