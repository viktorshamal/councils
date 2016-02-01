councils.controller('DocumentIndexController', ['$scope','Document',
    function($scope,Document) {
        $scope.documents = Document.$search();

        $scope.createDocument = function(){
            $scope.documents.$create();
        };

        $scope.deleteDocument = function(document){
            document.$destroy();
        }
    }
])
.controller('DocumentController', ['$scope','$http','$stateParams','Paragraph','Document',
    function($scope,$http,$stateParams,Paragraph,Document) {
        $scope.document = Document.$new($stateParams.id);
        $scope.paragraphs = $scope.document.paragraphs.$fetch();

        $scope.suggest = function(paragraph,description){
            var suggestion = Paragraph.$create({
                description:  description,
                suggested_to: paragraph.id,
                document_id:  $scope.document.id
            });

            paragraph.suggestions.push(suggestion);
        };

        $scope.deleteSuggestion = function(paragraph,suggestion){
            Paragraph.$new(suggestion.id).$destroy().$then(function(){
                var index = paragraph.suggestions.indexOf(suggestion);
                paragraph.suggestions.splice(index, 1);
            });

        };

        $scope.deleteParagraph = function(paragraph){
            paragraph.$destroy().then(function(){
                var index = $scope.paragraphs.$indexOf(paragraph);
                $scope.paragraphs.splice(index,1);
            });
        };

        $scope.acceptSuggestion = function(suggestion){
            $http.post('/v1/paragraphs/' + suggestion.id + '/accept/', {}).then(function () {
                $scope.paragraphs.$refresh();
            });
        };

        $scope.createParagraph = function(){
            $scope.paragraphs.$create({description: $scope.paragraphText});
            $scope.paragraphText = '';
        };

        $scope.previousVersion = function(paragraph){
            var previous_version = Paragraph.$find(paragraph.id + '/previous');
            previous_version.$then(function(){
                i = $scope.paragraphs.indexOf(paragraph);
                $scope.paragraphs[i] = previous_version;
            });
        };
    }
]);