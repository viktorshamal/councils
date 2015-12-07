councils.factory('Meeting', ['restmod',function(restmod) {
    return restmod.model('v1/meetings').mix({
        users: { hasMany: 'User'}
    });
}]);