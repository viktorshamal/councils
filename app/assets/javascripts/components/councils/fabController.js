councils.controller('FabController', ['$scope','$uibModal', function($scope, $uibModal) {
    $scope.actions = [
        {
            icon: 'group',
            modal: 'meetingsModal',
            color: 'green',
            tooltip: 'Nyt møde'
        }
        ,{
            icon: 'group_work',
            modal: 'documentsModal',
            color: 'blue'
        }
    ];

    $scope.showSpinner = false;

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'meetings/new_meeting.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            size: "md"
        });
    };
}]);