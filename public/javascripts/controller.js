'use strict'

function Index($scope, $http, $location, $anchorScroll, $modal, $rootScope) {
  $rootScope.registerModal = function() {
    $modal.open({
      templateUrl: '/partials/register.html',
      windowClass: 'in',
      controller: ['$modalInstance', '$scope', function($modalInstance, $scope) {
        $scope.identity = 'iss';
        $scope.food = 'meat';
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };

        $scope.$watch('identity', function(newVal, oldVal) {
          $scope.showDepartment = false;
          $scope.showJob = false
          if (newVal === 'normal') {
            $scope.showDepartment = true;
          } else if (newVal === 'society') {
            $scope.showJob = true;
          }
        })

        $scope.submitRegist = function() {
          var ok = true;
          $scope.nameEmpty = false;
          $scope.phoneEmpty = false;
          $scope.emailEmpty = false;

          if (!$scope.name) {
            $scope.nameEmpty = true;
            ok = false;
          }

          if (!$scope.phone) {
            $scope.phoneEmpty = true;
            ok = false;
          }

          if (!$scope.email) {
            $scope.emailEmpty = true;
            ok = false;
          }

          if (!$scope.image) {
            $scope.imageEmpty = true;
            ok = false;
          }

          if (!ok) {
            return;
          } else {
            $http({
              method: 'POST',
              url: '/register',
              data: {
                name: $scope.name,
                nickname: $scope.nickname || '',
                phone: $scope.phone,
                email: $scope.email,
                food: $scope.food,
                identity: $scope.identity,
                speciality: $scope.job || '',
                department: $scope.department || '',
                imagination: $scope.image
              }
            }).success(function(res) {
              if (res.error) {
                alertify.error(res.error.msg);
                return;
              }
              $modalInstance.close();
            });
          }
        };
      }]
    }).result.then(function() {
      alertify.success('報名成功！');
    });
  }

}