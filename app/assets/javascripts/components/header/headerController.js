councils.controller('headerController', ['$scope','$state','$auth', function($scope,$state,$auth) {
    $scope.$watchCollection(function(){
        return $state.params.council;
    }, function(){
        $scope.councilChosen = !!$state.params.council;
    });
}]);