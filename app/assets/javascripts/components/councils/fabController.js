councils.controller('FabController', ['$scope','$uibModal', function($scope, $uibModal) {
    $scope.actions = [
        {
            modalUrl: 'meetings/modals/meeting.html',
            controller: 'MeetingModalController',
            icon: 'group',
            color: 'green',
            tooltip: 'Nyt møde'
        }
        ,{
            modalUrl: 'meetings/modals/meetingTemplate.html',
            controller: 'MeetingTemplateModalController',
            icon: 'group_work',
            color: 'blue',
            tooltip: 'Nyt udvalg'
        }
    ];

    $scope.showSpinner = false;

    $scope.open = function (action) {
        $uibModal.open({
            animation: true,
            templateUrl: action.modalUrl,
            controller: action.controller,
            scope: $scope,
            size: "md"
        });
    };
}]);