councils.controller('MeetingController', ['$scope','Meeting','$stateParams','$interval',
    function($scope,Meeting,$stateParams,$interval) {
        $scope.meeting = Meeting.$find($stateParams.id);
        $scope.users = $scope.meeting.users.$fetch();

        var intervalPromise = $interval(function(){$scope.users.$refresh(); },2000);
        $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }
])

.controller('MeetingIndexController', ['$scope','Meeting','$stateParams','$uibModal',
    function($scope,Meeting,$stateParams,$uibModal) {
        $scope.meetings = Meeting.$search({council:$stateParams.council});

        $scope.date = moment("20111031", "YYYYMMDD").fromNow();

        $scope.readableDate = function(date){
            return moment(date).format('LL');
        };

        $scope.meetingOptions = [
            {name: 'Elevrådsmøde', color: 'black', date: new Date()},
            {name: 'Bestyrelsesmøde', color:'red'}
        ];

        $scope.destroyMeeting = function(meeting){
            meeting.$destroy();
        };

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'meetings/new_meeting.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                size: size
            });
        };
}])
.controller('ModalInstanceCtrl',['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.newMeeting = $scope.meetingOptions[0];

    $scope.createMeeting = function(){
        $scope.meetings.$create({
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