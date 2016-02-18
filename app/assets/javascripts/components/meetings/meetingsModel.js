councils.factory('Meeting', ['restmod',function(restmod) {
    return restmod.model('meetings').mix({
        users: { hasMany: 'User'},
        $extend: {
            Record: {
                readableDate: function() {
                    moment("20111031", "YYYYMMDD").fromNow();
                }
            }
        }
    });
}]).factory('MeetingTemplate', ['restmod', function(restmod){
    return restmod.model('meeting_templates');
}]);