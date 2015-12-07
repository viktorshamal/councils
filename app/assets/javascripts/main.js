var councils = angular.module('councils',[
    'templates',
    'ngRoute',
    'controllers',
    'restmod',
    'monospaced.qrcode',
    'ng-token-auth',
    'ngSanitize',
    'xeditable'
])

.run(function(editableOptions) {
    editableOptions.theme = 'default'
})

.config(['restmodProvider',function(restmodProvider) {
    restmodProvider.rebase('AMSApi');
}])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/documents/:id', {
            templateUrl: 'documents/show.html',
            controller: 'DocumentController'
        })
        .when('/documents/', {
            templateUrl: 'documents/index.html',
            controller: 'DocumentIndexController'
        })
        .when('/meetings/:id', {
        templateUrl: 'meetings/shower.html',
        controller: 'MeetingController'
        })
        .when('/meetings/', {
        templateUrl: 'meetings/index.html',
        controller: 'MeetingIndexController'
        })
        .when('/', {
        templateUrl: 'meetings/index.html',
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
]);

controllers = angular.module('controllers',[]);
