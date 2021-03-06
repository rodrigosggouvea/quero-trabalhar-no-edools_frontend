'use strict';

angular.module('myApp.repoDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/repo/:owner/:repo', {
    templateUrl: 'repoDetails/repoDetails.html',
    controller: 'repoDetailsController'
  });
}])

.factory('repoDetailsService', function($http) {
  var githubAPI = {};
  githubAPI.getRepoDetails = function(full_name){
    return $http({
      url: "https://api.github.com/repos/"+full_name
    });
  };
  githubAPI.getRepoIssues = function(full_name){
    return $http({
      url: "https://api.github.com/repos/"+full_name+"/issues"
    });
  }
  return githubAPI;
})

.controller('repoDetailsController', function($scope, $routeParams, repoDetailsService) {
  $scope.full_name = $routeParams.owner + '/' + $routeParams.repo
  $scope.repo = null;
  $scope.issuesList = [];
  repoDetailsService.getRepoDetails($scope.full_name).success(function(response){
    $scope.repo = response;
  });
  repoDetailsService.getRepoIssues($scope.full_name).success(function(response){
    $scope.issuesList = response;
  });
})

;