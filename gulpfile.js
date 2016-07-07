var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	config = require('./tsconfig');

gulp.task('default', function () {
	return gulp.src(config.fileGlobs)
		.pipe(ts(config.compilerOptions))
		.pipe(gulp.dest('./'));
});