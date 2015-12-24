councils.controller('MeetingController', ['$scope','Meeting','$routeParams','$interval',
    function($scope,Meeting,$routeParams,$interval) {
        $scope.meeting = Meeting.$find($routeParams.id);
        $scope.users = $scope.meeting.users.$fetch();

        var intervalPromise = $interval(function(){$scope.users.$refresh(); },2000);
        $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }
])

.controller('MeetingIndexController', ['$scope','Meeting','$routeParams', function($scope,Meeting,$routeParams) {
    $scope.meetings = Meeting.$search();

    $scope.meetingOptions = [
        {name: 'Elevrådsmøde', color: 'black'},
        {name: 'Bestyrelsesmøde', color:'red'}
    ];

    $scope.newMeeting = $scope.meetingOptions[0];

    $scope.createMeeting = function(){
        $scope.meetings.$create({name: $scope.newMeeting.name});
    };

    $scope.destroyMeeting = function(meeting){
        meeting.$destroy();
    };
}]);