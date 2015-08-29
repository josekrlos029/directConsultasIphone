angular.module('starter.controllers', [])
.controller('pautasController', function($scope, $stateParams, $ionicLoading) {
    
    $scope.idSubcategoria  = $stateParams.idSubcategoria;

});