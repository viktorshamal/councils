councils.controller('HomeController', ['$rootScope','$scope','$auth','$state','Council',
    function($rootScope,$scope,$auth,$state,Council) {
        $scope.$on("$stateChangeSuccess", function updatePage() {
            $scope.hideCouncilPicker = !!$state.params.council;
        });

        $rootScope.working = false;

        $rootScope.$on('working', function(){
            $scope.working = true;
        });

        var toastTime = 3000;

        $rootScope.$on('success', function(e,resourceName){
            Materialize.toast(resourceName + ' blev oprettet', toastTime);
            $scope.working = false;
        });

        $rootScope.$on('failure', function(){
            Materialize.toast('Der opstod en fejl', toastTime);
            $scope.working = false;
        });
    }])

.controller('menuController', ['$scope','$auth', function($scope,$auth) {

}]);