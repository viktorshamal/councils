councils.directive("clickToEdit", function() {
    var editorTemplate =
        '<div class="click-to-edit">' +
            '<a ng-click="switchTab()" ng-show="view.editorEnabled">Switch</a>' +
            '<div ng-hide="view.editorEnabled && !view.editorTab">' +
                '<a ng-click="enableEditor()">' +
                    '{{ value }}' +
                '</a>' +
            '</div>' +
        '<div ng-show="view.editorEnabled && view.editorTab">' +
            '<textarea auto-grow class="editor" ng-model="view.editableValue"></textarea>' +
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
                editorEnabled: false,
                editorTab: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.editorTab = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.switchTab = function() {
              $scope.view.editorTab = !$scope.view.editorTab;
            };

            $scope.disableEditor = function() {
                $scope.editorTab = false;
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.callback({description: $scope.view.editableValue});
                $scope.disableEditor();
            };
        }
    };
}).directive("autoGrow", ['$window', function($window){
        return {
            link: function (scope, element, attr, $window) {
                var update = function () {
                    var scrollLeft, scrollTop;
                    scrollTop = window.pageYOffset;
                    scrollLeft = window.pageXOffset;

                    element.css("height", "auto");
                    var height = element[0].scrollHeight;
                    if (height > 0) {
                        element.css("height", height + "px");
                    }
                    window.scrollTo(scrollLeft, scrollTop);
                };
                scope.$watch(attr.ngModel, function () {
                    update();
                });
                attr.$set("ngTrim", "false");
            }
        };
    }]);