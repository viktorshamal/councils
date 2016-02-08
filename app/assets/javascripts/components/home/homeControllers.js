councils.controller('HomeController', ['$scope','$auth','$state','Council',
    function($scope,$auth,$state,Council) {
        $scope.$on("$stateChangeSuccess", function updatePage() {
            $scope.hideCouncilPicker = !!$state.params.council;
        });
    }])

.controller('menuController', ['$scope','$auth', function($scope,$auth) {

}]);