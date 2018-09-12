const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// copy all HTML files
gulp.task('copyHTML', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('dist'));
});

// image optimize size 
gulp.task('imageMin', function() {
	gulp.src('./img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});


// sass compiles
gulp.task('sass', function() {
	gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({ stream: true}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
        	baseDir: './'
        }
    });

    gulp.watch("./img/*", ['imageMin']);
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['copyHTML' ,'sass', 'imageMin', 'serve'])
