var receta = angular.module('receta',[
  'templates',
  'ngRoute',
  'controllers',
  'monospaced.qrcode'
]);

receta.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'RecipesController'
      })
  }
]);
controllers = angular.module('controllers',[]);
receta.controller('RecipesController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);
