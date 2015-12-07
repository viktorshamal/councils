councils.config(['$authProvider',function($authProvider) {
    $authProvider.configure({
        apiUrl: '/v1',
        storage:'localStorage'
    });
}])
.factory('User',['restmod', function(restmod) {
    return restmod.model('users').mix({
        meetings: { hasMany: 'Meeting'}
    });
}]);