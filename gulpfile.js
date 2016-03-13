"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); //Bundle JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var eslint = require('gulp-eslint'); // Lint JS files, including JSX

// Start a local development server

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './dist',
		mainJs: './src/main.js',
		images: './src/images/**/*'
	}

}

gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('./dist/index.html')
		.pipe(open({
			uri: config.devBaseUrl + ':' + config.port + '/'
		}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('image', function() {
	var imgDst = config.paths.dist + '/images';
	gulp.src(config.paths.images)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst))
		.pipe(connect.reload());
});



gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.images, ['image']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(eslint({
			config: 'eslint.config.json'
		}))
		.pipe(eslint.format());
});

gulp.task('default', ['html','image', 'js', 'css', 'lint', 'open', 'watch']);








