councils.controller('FabController', ['$scope','$uibModal', function($scope, $uibModal) {
    $scope.actions = [
        {
            icon: 'group',
            modal: 'meetingsModal',
            color: 'green'
        },
        {
            icon: 'format_align_justify',
            modal: 'documentsModal',
            color: 'blue'
        }
    ];

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