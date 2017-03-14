app.constant('constants', {
	'host': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://speccheck.mylesshannon.me' : 'http://localhost:8080'; })(),
	'api': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://api.mylesshannon.me' : 'http://localhost:8002/api/v1'; })(),
	'states': {'requireIn':['uploadLog'], 'requireOut':[]},
});