var gulp = require("gulp"),
    php = require("gulp-connect-php"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    webpack = require("webpack-stream");


gulp.task("sass", function(){
    return gulp.src("./resources/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./public/assets/css"))
});

gulp.task("script", function() {
    return gulp.src("./resources/assets/js/app.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./public/assets/js/"));
});




gulp.task('php', function() {
    php.server({ base: './public', port: 8000, keepalive: true});
});
gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8000',
        port: 8080,
        open: true,
        notify: false
    });
});


gulp.task("serve", ['browser-sync'], function() {
    gulp.watch("./resources/assets/sass/**/*.scss",['sass']);
    gulp.watch("./resources/assets/js/**/*.js",['script']);


    gulp.watch("./public/assets/css/**/*.css").on("change", browserSync.reload)
    gulp.watch("./public/assets/js/app.js").on("change", browserSync.reload)
    gulp.watch("./public/*.html").on("change", browserSync.reload)
});
