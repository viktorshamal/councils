councils.controller('MeetingController', ['$scope','Meeting','$stateParams','$interval',
    function($scope,Meeting,$stateParams,$interval) {
        $scope.meeting = Meeting.$find($stateParams.id);
        $scope.users = $scope.meeting.users.$fetch();

        $scope.showQr = false;

        $scope.toggleQr = function(){
            $scope.showQr = !$scope.showQr;
        };

        var intervalPromise = $interval(function(){$scope.users.$refresh(); },2000);
        $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }
])

.controller('MeetingIndexController', ['$scope','Meeting','$stateParams','$uibModal',
    function($scope,Meeting,$stateParams,$uibModal) {
        $scope.meetings = Meeting.$search({council:$stateParams.council});

        $scope.date = moment("20111031", "YYYYMMDD").fromNow();

        $scope.destroyMeeting = function(meeting){
            meeting.$destroy();
        };

        $scope.readableDate = function(date){
            return moment(date).format('LL');
        };
}])
.controller('ModalInstanceCtrl',['$scope', '$uibModalInstance','Meeting', function ($scope, $uibModalInstance, Meeting) {

    $scope.meetingOptions = [
        {name: 'Elevrådsmøde', color: 'black', date: new Date()},
        {name: 'Bestyrelsesmøde', color:'red'}
    ];

    $scope.newMeeting = $scope.meetingOptions[0];

    $scope.readableDate = function(date){
        return moment(date).format('LL');
    };

    $scope.createMeeting = function(){
        Meeting.$create({
            name: $scope.newMeeting.name,
            date: $scope.newMeeting.date
        });
    };

    $scope.ok = function () {
        $scope.createMeeting();
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);