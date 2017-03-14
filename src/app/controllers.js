app.controller('IndexCtrl', function($rootScope) {
  
})
.controller('UserCtrl', function($http, $rootScope, toastr) {

})
.controller('LogCtrl', function($http, $rootScope, toastr) {

})
.controller('NavCtrl', function($scope, $rootScope, auth, apiSource, constants, auth, toastr, $http) {
	var self = this;
	$scope.$on('$routeChangeSuccess', function(event, next, last) {
		self.active = next.$$route.controllerAs;
	});

	this.login = function(provider) {
		auth.login(provider);
	};

	this.logout = function() {
		auth.logout();
	};
});