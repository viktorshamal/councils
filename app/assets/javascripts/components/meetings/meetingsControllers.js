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

.controller('MeetingIndexController', ['$scope','Meeting','$stateParams',
    function($scope,Meeting,$stateParams) {
        $scope.meetings = Meeting.$search({identifier:$stateParams.council});

        $scope.date = moment("20111031", "YYYYMMDD").fromNow();

        $scope.destroyMeeting = function(meeting){
            meeting.$destroy();
        };

        $scope.readableDate = function(date){
            return moment(date).format('LL');
          };
}])
.controller('ModalInstanceCtrl',['$scope', '$uibModalInstance','Meeting', 'MeetingTemplate', '$state',
 function ($scope, $uibModalInstance, Meeting, MeetingTemplate, $state) {

    $scope.meetingOptions = MeetingTemplate.$search({identifier:$state.params.council});

    $scope.meetingTemplate = $scope.meetingOptions[0];
    $scope.meetingDate = new Date();

    $scope.readableDate = function(date){
        return moment(date).format('LL');
    };

    $scope.createMeeting = function(){
        Meeting.$create({
            meetingTemplateId: $scope.meetingTemplate.id,
            date: $scope.meetingDate
        }).$then(function(meeting){
            $state.go('root.councils.meetings.show',{id:meeting.id});
        }, function(error){
            Materialize.toast('Der opstod en fejl',3000);
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