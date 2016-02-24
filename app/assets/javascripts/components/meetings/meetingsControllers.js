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

        $scope.destroyMeeting = function(meeting){
            meeting.$destroy();
        };

        $scope.readableDate = function(date){
            return moment(date).format('LL');
          };
}])
.controller('MeetingModalController',
['$rootScope','$scope', '$uibModalInstance','Meeting', 'MeetingTemplate', '$state',
function($rootScope, $scope, $uibModalInstance, Meeting, MeetingTemplate, $state) {
    $scope.meetingOptions = MeetingTemplate.$search({identifier:$state.params.council});

    $scope.meetingTemplate = $scope.meetingOptions[0];
    $scope.meetingDate = new Date();

    $scope.readableDate = function(date){
        return moment(date).format('LLL');
    };

    $scope.createMeeting = function(){
        $rootScope.$emit('working');
        var meeting = Meeting.$create({
            meetingTemplateId: $scope.meetingTemplate.id,
            date: $scope.meetingDate
        }).$then(function(){
            $rootScope.$emit('success', 'Mødet');
            $state.go('root.councils.meetings.show',{id:meeting.id});
        }, function(){
            $rootScope.$emit('failure');
        });
    };

    $scope.ok = function () {
        $scope.createMeeting();
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}])
.controller('MeetingTemplateModalController',
['$rootScope','$scope', '$uibModalInstance','MeetingTemplate',
function ($rootScope, $scope, $uibModalInstance, MeetingTemplate) {
    $scope.template = {name:''};

    $scope.createTemplate = function(){
        $scope.$emit('working');
        MeetingTemplate.$create({
            name: $scope.template.name
        }).$then(function(){
            $rootScope.$emit('success', 'Mødetypen');
        }, function(){
            $rootScope.$emit('failure');
        });

    };
    $scope.ok = function () {
        $scope.createTemplate();
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);