councils.controller('DocumentIndexController', ['$scope','Document',
    function($scope,Document) {
        $scope.documents = Document.$search();
    }
])
.controller('DocumentController', ['$scope','Document','$routeParams',
    function($scope,Document,$routeParams) {
        $scope.document = Document.$find($routeParams.id);
    }
]);