module.exports = function(grunt) {
	var rewrite = require('connect-modrewrite');

	// server config
	var livereloadPort = 3500;
	var hostPort = 8080;
	var hostAddress = 'localhost';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			front: {
				options: {
					port: hostPort,
					hostname: hostAddress,
					livereload: livereloadPort,
					open: true,
					base: './dist/',
					middleware: function(connect, options, middlewares) {
						var rules = [
						'!\\.html|\\.woff|\\.eot|\\.ttf|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
						];
						middlewares.unshift(rewrite(rules));
						middlewares.unshift(require('connect-livereload')());
						return middlewares;
					}
				}
			}
		},
		less: {
			options: {
				style: 'compact',
				sourcemap: 'none'
			},
			front: {
				src: './src/styles.less',
				dest: './dist/styles.min.css'
			}
		},
		copy: {
			front: {
				files: [
					{expand: true, cwd: './src/', src: 'analytics.js', dest: './dist/'},
					{expand: true, cwd: './src/', src: 'robots.txt', dest: './dist/'},
					{expand: true, cwd: './src/views/', src: '*.html', dest: './dist/views'},
					{expand: true, cwd: './src/assets/', src: '**', dest: './dist/assets'}
				]
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			front: {
				src: './src/app/*.js',
				dest: '.tmp/app.js'
			},
		},
		uglify: {
			options: {
				report: 'min',
				soureMap: true,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			front: {
				src: '.tmp/app.js',
				dest: './dist/app.min.js'
			}
		},
		htmlbuild: {
			dev: {
				src: './src/index.html',
				dest: '.tmp/index.html',
				options: {
					scripts: {
						analytics: []
					}
				}
			},
			prod: {
				src: './src/index.html',
				dest: '.tmp/index.html',
				options: {
					beautify: true,
					relative: false,
					scripts: {
						'analytics': {cwd: '', files: ['analytics.js']}
					}
				}
			}
		},
		htmlmin: {
			front: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeComments: true
				},
				files: [
					{expand: true, cwd: './src/app/views/', src: '**/*.html', dest: './dist/views/'},
					{'./dist/index.html': '.tmp/index.html'}
				]
			}
		},
		bower: {
			front: {
				options: {
					install: false,
					layout: "byComponent",
					targetDir: './dist/libs/'
				}
			}
		},
		jshint: {
			front: {
				options: {
					reporter: require('jshint-stylish'),
					curly: true,
					eqeqeq: true,
					eqnull: true,
					browser: true,
					globals: {
						jQuery: true
					},
				},
				files: {
					src: ['Gruntfile.js', './src/app/*.js']
				}
			}
		},
		watch: {
			front: {
				tasks: ['build:front:dev'],
				options: { 
					livereload: livereloadPort
				},
				files: ['./src/**']
			}
		},	
		clean: {
			folder: '.tmp/',
			cache: '.sass-cache/'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-composer');

	grunt.registerTask('default', ['build:front:dev']);

	grunt.registerTask('test', ['jshint:front']);

	grunt.registerTask('serve', ['build:front', 'connect:front', 'watch:front:dev']);

	grunt.registerTask('prod', ['build:front:prod']);

	grunt.registerTask('build', function(tar, arg) {
		if(tar === undefined) {
			tar = 'front';
		}
		if(arg === undefined) {
			arg = 'dev'; // build target dev if not otherwise specified
		}
		grunt.task.run([
			'copy:front',
			'bower:front',
			'less:front',
			'ngAnnotate:front',
			'uglify:front',
			'htmlbuild:'+arg,
			'htmlmin:front',
			'clean'
		]);
	});
};