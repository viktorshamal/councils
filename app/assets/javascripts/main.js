var councils = angular.module('councils',[
    'templates',
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
            urlPrefix: '/v1'
        }
    });
}])
.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
}]);

controllers = angular.module('controllers',[]);
