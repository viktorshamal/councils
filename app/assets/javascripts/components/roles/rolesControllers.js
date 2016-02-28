councils.controller('RolesModalController',
['$scope', '$uibModalInstance','MeetingTemplate', '$state', 'Role', '$http', 'User',
function ($scope, $uibModalInstance, MeetingTemplate, $state, Role, $http, User) {
    $scope.templates = MeetingTemplate.$search({
        identifier: $state.params.council}
    ).$then(function () {
        $scope.activeTemplate = $scope.templates[0];
    });

    $scope.users = User.$search({
            identifier: $state.params.council}
    ).$then(function () {
            $scope.activeUser = $scope.users[0];
    });

    var roles;

    var updateRoles = function(){
        if($scope.activeTemplate){
            roles = Role.$search({
                meeting_template_id: $scope.activeTemplate.id
            }).$then(function() {
                $scope.role = roles[0];
            });
        }
    };

    $scope.$watch('activeTemplate', function(){
        updateRoles();
    });

    $scope.addRole = function() {
        $http({
            method: 'post',
            url: '/v1/roles',
            data: {
                user_id: $scope.activeUser.id,
                meeting_template_id: $scope.activeTemplate.id
            }
        }).then(
            updateRoles()
        );
    };


    $scope.deleteRole = function(user) {
        $http({
            method: 'delete',
            url: '/v1/roles',
            params: {
                user_id: user.id,
                meeting_template_id: $scope.activeTemplate.id
            }
        }).then(
            updateRoles()
        );
    };

    $scope.ok = function () {
        $scope.createTemplate();
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);