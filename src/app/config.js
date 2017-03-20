app.config(function($provide, $routeProvider, $locationProvider, $httpProvider, $authProvider, toastrConfig, constants) {
	$provide.factory('XSRFInterceptor', function($cookies, apiSource, constants) {
		return {
			request: function(config) {
        if(config.url.indexOf(constants.api) === 0 && config.url.indexOf(apiSource.url) === -1) {
          config.url = apiSource.url + '/' + config.url.split('/').slice(3).join('/');
        }
				var cookie = $cookies.get('XSRF-TOKEN');
				if(cookie) {
					config.headers['X-XSRF-TOKEN'] = cookie;
				}
				return config;
			}
		};
	});
	$httpProvider.interceptors.push('XSRFInterceptor');
	$httpProvider.defaults.withCredentials = true;

	$locationProvider.html5Mode(true);

	$authProvider.baseUrl = constants.api;
	$authProvider.withCredentials = true;
	$authProvider.google({
		clientId: '786999100982-9ugrvcg6gfh8412vjaqecj3c9i6376up.apps.googleusercontent.com'
	});

	$routeProvider.otherwise({
	    redirectTo: '/'
	});
	$routeProvider
	.when('/', {
		templateUrl: 'views/index.html',
		controller: 'IndexCtrl',
		controllerAs: 'index',
		resolve: {
			check: function(auth) {
				return auth.check('index').catch(function(){});
			}
		}
	})
	.when('/crafts', {
		templateUrl: 'views/crafts.html',
		controller: 'CraftsCtrl',
		controllerAs: 'crafts',
		resolve: {
			check: function(auth) {
				return auth.check('crafts').catch(function(){});
			}
		}
	})
	.when('/craft/:craftId', {
    templateUrl: 'views/craft.html',
    controller: 'CraftCtrl',
    controllerAs: 'craft',
    resolve: {
      check: function(auth) {
        return auth.check('craft').catch(function(){});
      }
    }
  })
  .when('/log/:logId', {
    templateUrl: 'views/log.html',
    controller: 'LogCtrl',
    controllerAs: 'log',
    resolve: {
      check: function(auth) {
        return auth.check('log').catch(function(){});
      }
    }
  })
  .when('/user/:userId', {
    templateUrl: 'views/user.html',
    controller: 'UserCtrl',
    controllerAs: 'user',
    resolve: {
      check: function(auth) {
        return auth.check('user').catch(function(){});
      }
    }
  });

	angular.extend(toastrConfig, {
		positionClass: 'toast-top-center',
		timeOut: 3000,
		maxOpened: 1
	});
});
