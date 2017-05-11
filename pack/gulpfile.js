const gulp = require('gulp')//
const uglify = require("gulp-uglify")//js的压缩
const rename = require("gulp-rename")//重命名
const concat = require("gulp-concat")//文件合并
const sass = require("gulp-sass")//sass的编译
const css = require("gulp-minify-css")//css的压缩
const browserify = require("gulp-browserify")//模块化的打包
const html = require("gulp-htmlmin")//html压缩成一行
const server = require("gulp-webserver")//web服务热启动
const imagemin = require("gulp-imagemin")//图片的压缩
const rev = require("gulp-rev")//对文件名加MN5后缀
const collector = require("gulp-rev-collector")//路径替换
var url=require("url")
var datajson=require("./data/get.js")
gulp.task("js", function () {
    gulp.src("src/js/*.js")
        .pipe(uglify())
        //.pipe(rename("./build/js/index2.js"))
        //.pipe(concat("style.js"))
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(rev())
        .pipe(gulp.dest("./build/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev/js"))
})
gulp.task("sass", function () {
    gulp.src("src/css/*.scss")
        .pipe(sass())
        .pipe(css())
        .pipe(rev())
        .pipe(gulp.dest("./build/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev/css"))
})
gulp.task("html", function () {
    gulp.src("src/html/*.html")
        .pipe(html())
        .pipe(gulp.dest("./build/html"))
})

gulp.task("imagemin", function () {
    gulp.src("src/image/*.JPG")
        .pipe(imagemin())
        .pipe(gulp.dest("./build/image"))
})

gulp.task("rev",function () {
    gulp.src(["./rev/**/*.json","./src/html/*.html"])
        .pipe(collector({
            replaceReved:true,
            dirReplacements:{
                "css":"css",
                "js":"js"
            }
        }))
        .pipe(gulp.dest("./build/html"))
})

gulp.task("build", ["js", "sass", "html","imagemin","rev"])

gulp.task("server", ["build"], function () {
    gulp.src("./build")
        .pipe(server({
            port: 3333,
            livereload: true,
            directoryListing: true,
            //中间件
            middleware: function (req, res, next) {
                //序列化地址 请求路径
                const reqPath = url.parse(req.url).pathname;
                const routers = datajson.data();
                //routers抛出数组
                routers.forEach(function (i) {
                    console.log(i.route);
                    console.log(reqPath);
                    if (i.route == reqPath) {
                        i.handle(req, res, next)
                    }
                })
                next()//执行next()函数
            },
            open: "/html/index.html"
        }));
})
