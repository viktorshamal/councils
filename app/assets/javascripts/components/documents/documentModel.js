councils.factory('Document', ['restmod',function(restmod) {
    return restmod.model('documents').mix({
        paragraphs: { hasMany: 'Paragraph' }
    });
}])
.factory('Paragraph', ['restmod',function(restmod) {
    return restmod.model('paragraphs');
}]);