councils.controller('DocumentIndexController', ['$scope','Document',
    function($scope,Document) {
        $scope.documents = Document.$search();
    }
])
.controller('DocumentController', ['$scope','Document','$routeParams',
    function($scope,Document,$routeParams) {
        $scope.document = Document.$new($routeParams.id);
        $scope.paragraphs = $scope.document.paragraphs.$fetch();

        $scope.updateParagraph = function(paragraph){
            paragraph.$save(['description']);
        }
    }
]);