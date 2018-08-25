const gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    htmlImport = require('gulp-html-import'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    webserver = require('gulp-webserver'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload
htmlPages=['index'];

//全局html 解析任务
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(htmlImport('./src/html/'))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets:['babel-preset-es2015']
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(reload({stream: true}));
});
gulp.task('less', function () {
    gulp.src('src/css/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css/')) //将会在src/css下生成index.css
        .pipe(reload({stream: true}));

});
//图片的转移
gulp.task('img',function() {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img/'))
        .pipe(reload({stream: true}));
});

htmlPages.forEach(function(ele,ind){
    gulp.task('html'+ind, function() {
        gulp.src('./src/'+ele+'.html')
            .pipe(htmlImport('./src/html/'))
            .pipe(gulp.dest('./dist/'))
            .pipe(reload({stream: true}));
    });
});
gulp.task('webserver',['html','js','less','img'], function() {
    // gulp.src('./')
    //     .pipe(webserver({
    //         livereload: true,
    //         directoryListing: true,
    //         port:1111,
    //         open: true
    //     }));
    //浏览器同步 初始化
    browserSync.init({
        server: "./dist"
    });
    //侦测每一个html 主页变化
    htmlPages.forEach(function(ele,ind){
        gulp.watch('./src/'+ele+'.html', ['html'+ind]);
    });

    //检测html 组件的变化，其变化回触发全局html 解析任务
    gulp.watch('./src/*.html', ['html']);
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch("./src/css/*.less", ['less']);
    gulp.watch("./src/img/**", ['img']);

    gulp.watch('./dist/jsas/*.js').on('change', reload);
});

gulp.task('default', ['webserver']); //该任务针对的文件
