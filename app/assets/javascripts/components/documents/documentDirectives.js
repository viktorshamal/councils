councils.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-hide="view.editorEnabled">' +
        '<a ng-click="enableEditor()">' +
        '{{ value }}' +
        '</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
        '<textarea class="editor" ng-model="view.editableValue"></textarea>' +
        '<br>' +
        '<a ng-click="save()">Save</a>' +
        ' or ' +
        '<a ng-click="disableEditor()">cancel</a>.' +
        '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
            callback: "&callback"
        },
        controller: function($scope) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.callback({description: $scope.view.editableValue});
                $scope.disableEditor();
            };
        }
    };
});