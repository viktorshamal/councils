var councils = angular.module('councils',[
  'templates',
  'ngRoute',
  'controllers',
  'restmod',
  'monospaced.qrcode',
  'ng-token-auth'
])

.config(function(restmodProvider) {
    restmodProvider.rebase('AMSApi');
})

.factory('Meeting', function(restmod) {
    return restmod.model('v1/meetings').mix({
      users: { hasMany: 'User'}
    });
})

.factory('User', function(restmod) {
    return restmod.model('v1/users').mix({
      meetings: { hasMany: 'Meeting'}
    });
})

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
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/attend/:secret', {
            resolve: {
                attend: ['attendService', function (attendService) {
                    attendService();
                }]
            },
        })
  }
])

.factory('attendService', function ($location,$route,$http) {
    return function () {
      $http.post('/v1/attendances',{ secret: $route.current.params.secret })
        .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          $location.path('/meetings/' + response.data.meeting_id);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert(response.data.errors[0]);
          $location.path('/meetings/');
        });
      }
})

.config(function($authProvider) {
        $authProvider.configure({
            apiUrl: '/v1',
            storage:'localStorage'
        });
    });

controllers = angular.module('controllers',[]);

councils.controller('HomeController', ['$scope','$auth', function($scope,$auth) {

}]);

councils.controller('MeetingController', ['$scope','Meeting','$routeParams','$auth', function($scope,Meeting,$routeParams,$auth) {
  $scope.meeting = Meeting.$find($routeParams.id);
  $scope.users = $scope.meeting.users.$fetch();
}]);

councils.controller('MeetingIndexController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
  $scope.meetings = Meeting.$search();

  $scope.createProject = function(){
    Meeting.save();
    $scope.meetings = Meeting.query();
  }
}]);
