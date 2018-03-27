// ---------------------------------------------->
//   CONST REQUIREMENTS HERE 
//----------------------------------------------->
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');

//----------------------------------------------->
//    GULP TASKS HERE
//----------------------------------------------->
//            BUNDLE ALL .JS FILES
//  This task will use gulp to take all src/js files
//  using the globbing keystroke of /* to mean all of 
//  the js files, then uglify(minimize which increases
//  speed) and concatonates (again, for computer use only
//  to make speed faster) then give it a destination of the
//  dist file... Then going to index.html, delete the two script
//  tags:    <script src="libs/jquery-3.2.1.js"></script>
//           <script src="libs/makeCats.js"></script>
//   and replace with :
//            <script src="bundle.min.js"></script> 
//  Now, you only need one script tag and everything is stream-
//  lined into our development workflow.  This is task 1.

gulp.task ('build:js', function() {
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('dist'))
});
//  Now, for task 2 , as we add any more .js files, we simply need
//  to add them to a folder and then they will automatically get built
//  and included as part of the our markup. This is much easier than 
//  having to keep remembering to add script tags to our markup. Let's
//  do the same for the css files.

//-------------------------------------------------------->
//        BUNDLE .CSS FILES
//--------------------------------------------------------->

gulp.task ('build:css', function() {
    return gulp.src('src/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist'))
});
//  this created all css files to be found in the styles folder
//  and minimized it... then it replaced the following link ref tags
//  in the markup: <link rel="stylesheet" href="css/bootstrap.css">
//                 <link rel="stylesheet" href="css/custom.css">
//  with only one link:
//                 <link rel="stylesheet" href="styles.css">
//
//----------------------------------------------------------->
//         COPY ALL FILES IN THE /src/assets/ to the dist/assets/.
//----------------------------------------------------------->

gulp.task('copy', function() {
    return gulp.src('src/assets/*.png')
        .pipe(gulp.dest('dist/assets'))
});
//-------------------------------------------------------------->
//         THE WATCHER
//-------------------------------------------------------------->
//  this task will watch for any changes and if there are any
//  changes it will run the task in the array [] brackets. So
//  all changes will automatically update. 

gulp.task('watch', function() {
    gulp.watch('./src/css/*.css', ['build:css']);
    gulp.watch('./src/js/*.js', ['build:js']);
    gulp.watch('./src/assets/*.png', ['copy']);
});
//--------------------------------------------------------------->
//        THE SERVE 
//    this task will run a server and restart it as needed
//---------------------------------------------------------------->

gulp.task('serve', function() {
    return nodemon({
        script: 'server/index.js',
        env: {
        NODE_ENV: 'development'
        }
    });
});
//---------------------------------------------------------------->
//       THE DEFAULT
//    this task can be setup and run when you use gulp without passing
//    any arguments. In our case, we want the DEFAULT task to run a 
//    sequence of gulp tasks. 
//----------------------------------------------------------------->

gulp.task('default', ['build:js', 'build:css', 'copy', 'watch', 'serve']);

module.exports = gulp;
