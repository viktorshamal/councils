var councils = angular.module('councils',[
    'templates',
    //ngRoute',
    'controllers',
    'restmod',
    'monospaced.qrcode',
    'ng-token-auth',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'ui.router'
])

.config(['restmodProvider', function(restmodProvider) {
    restmodProvider.rebase('AMSApi');
    restmodProvider.rebase({
        $config: {
            urlPrefix: '/v1' // or use setProperty('urlPrefix', '/api/v1') in a definition function
        }
    });
}])

/*.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/documents/:id', {
            templateUrl: 'documents/show.html',
            controller: 'DocumentController'
        })
        .when('/documents/', {
            templateUrl: 'documents/index.html',
            controller: 'DocumentIndexController'
        })
        .when('/:council/meetings/:id', {
        templateUrl: 'meetings/show.html',
        controller: 'MeetingController'
        })
        .when('/:council/meetings/', {
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
])*/
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('root', {
                url: "",
                views: {
                    'header': {
                        templateUrl: "header.html",
                        controller: 'headerController'
                    },
                    'body': {
                        templateUrl: "<div ui-view></div>"
                    }
                }
            })
            .state('root.councils', {
                url: "/c/:council",
                templateUrl: "council/councils.html"
            })
            .state('root.councils.meetings', {
                url: "/meetings",
                templateUrl: "meetings/meetings.html"
            })
            .state('root.councils.meetings.list',{
                url: "/",
                templateUrl: "meetings/index.html",
                controller: 'MeetingIndexController'
            })
            .state('root.councils.meetings.show', {
                url: "/:id",
                templateUrl: "meetings/show.html",
                controller: "MeetingController"
            });
    }).run(function($state){
       console.log($state.get());
    });

controllers = angular.module('controllers',[]);
