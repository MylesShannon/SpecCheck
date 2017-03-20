app.controller('IndexCtrl', function($rootScope) {

})
.controller('CraftsCtrl', function($http, $rootScope, toastr, Upload) {
  var self = this;
  this.crafts = $rootScope.session.user._crafts_by_id;

	this.newCraft = function() {
    $http({method: 'POST', url: $rootScope.session.api+'/craft'}).then(function(resp) {
      self.crafts.push({id: resp.data.craft_id});
      toastr.success('New craft created!');
    }).catch(function(resp) {
      toastr.error('There was an error creating new craft');
    })
	}

  this.saveCraft = function(build, index) {
    console.log(build)
    $http({method: 'PUT', url: $rootScope.session.api+'/craft', params: build }).then(function(resp) {
      toastr.success('Craft saved!');
    }).catch(function(resp) {
      toastr.error('There was an error saving craft');
    })
  }

  this.removeCraft = function(build, index) {
    $http({method: 'DELETE', url: $rootScope.session.api+'/craft/'+build.id}).then(function(resp) {
    self.crafts.splice(index, 1);
    toastr.success('Craft removed!');
    }).catch(function(resp) {
      toastr.error('There was an error removing craft');
    })
  }

	this.uploadLog = function(file) {
    Upload.upload({
        url: $rootScope.session.api+'/craft/upload',
        data: {file: file}
    }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
	}
})
.controller('CraftCtrl', function($http, $rootScope, toastr) {

})
.controller('LogCtrl', function($http, $rootScope, toastr) {

})
.controller('UserCtrl', function($http, $rootScope, toastr) {

})
.controller('NavCtrl', function($scope, $rootScope, auth, apiSource, constants, auth, toastr, $http) {
	var self = this;
	$scope.$on('$routeChangeSuccess', function(event, next) {
		self.active = next.$$route.controllerAs;
	});

	this.login = function(provider) {
		auth.login(provider);
	};

	this.logout = function() {
		auth.logout();
	};
});
