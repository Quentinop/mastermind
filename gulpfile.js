var gulp         = require( 'gulp' ),
	concat       = require( 'gulp-concat'), // concat js
	uglify       = require( 'gulp-uglify' ), // min js
	stylus       = require( 'gulp-stylus' ), // stylus
	rename       = require( 'gulp-rename' ), // rename
	cssnano      = require( 'gulp-cssnano' ), // min css
	csscomb      = require( 'gulp-csscomb' ), // css order rules
	plumber      = require( 'gulp-plumber' ), // err control
	autoprefixer = require( 'gulp-autoprefixer' ); // autoprefix css



/* CSS */

// transform stylus in css
gulp.task( 'stylus', function(){

	return gulp.src( './dev/styles/stylus/main.styl' )
			   .pipe( plumber() )
			   .pipe( stylus() )
			   .pipe( gulp.dest( './dev/styles/css' ) )

});

// prefix css
gulp.task( 'prefix', ['stylus'], function(){

	return gulp.src( 'dev/styles/css/main.css' )
			   .pipe( plumber() )
			   .pipe( autoprefixer({browsers: ['last 3 versions'], cascade: true}) )
    		   .pipe( gulp.dest( 'dev/styles/css/' ) )
});


// order css
gulp.task( 'csscomb', ['stylus', 'prefix'], function() {
  	return gulp.src( 'dev/styles/css/main.css' )
			   .pipe( plumber() )
    		   .pipe( csscomb() )
    		   .pipe( gulp.dest( 'dev/styles/css' ) );
});


// min main.css
gulp.task( 'min-main', ['stylus', 'csscomb', 'prefix'], function() {

    return gulp.src( 'dev/styles/css/main.css' )
    		   .pipe( plumber() )
		       .pipe( cssnano() )
		       .pipe( rename( 'main.min.css' ) )
		       .pipe( gulp.dest( 'assets/styles/' ) );

});

// min reset.css
gulp.task( 'min-reset', function() {

    return gulp.src( 'dev/styles/css/reset.css' )
    		   .pipe( plumber() )
		       .pipe( cssnano() )
		       .pipe( rename( 'reset.min.css' ) )
		       .pipe( gulp.dest( 'assets/styles/' ) );

});



/* JS */

gulp.task( 'js', function()
{
    return gulp.src( [
            './dev/js/main.js',
            './dev/js/fastclick.js'
        ] )
        .pipe( concat( 'script.min.js' ) ) 
        .pipe( uglify() )                  
        .pipe( gulp.dest( './assets/js/' ) );
} );


/* WATCH */

gulp.task( 'watch', function(){

	gulp.watch( 'dev/styles/stylus/main.styl', ['prefix', 'csscomb', 'min-main'] );
	gulp.watch( 'dev/js/main.js', ['js'] );

});

/* DEFAULT */

gulp.task( 'default', [ 'min-main', 'js', 'watch' ] );