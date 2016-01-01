councils.factory('Meeting', ['restmod',function(restmod) {
    return restmod.model('meetings').mix({
        users: { hasMany: 'User'},
        $extend: {
            Record: {
                readableDate: function() {
                    console.log('hello');
                    moment("20111031", "YYYYMMDD").fromNow();
                }
            }
        }
    });
}]);