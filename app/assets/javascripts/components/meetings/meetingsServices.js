councils.factory('attendService', ['$location','$route','$http',function ($location,$route,$http) {
    return function () {
        $http.post('/v1/attendances',{ secret: $route.current.params.secret })
            .then(function successCallback(response) {
                $location.path('/meetings/' + response.data.meeting_id);
            }, function errorCallback(response) {
                alert(response.data.errors[0]);
                $location.path('/meetings/');
            });
    }
}]);