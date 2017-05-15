const gulp = require('gulp')//
const uglify = require("gulp-uglify")//js��ѹ��
const rename = require("gulp-rename")//������
const concat = require("gulp-concat")//�ļ��ϲ�
const sass = require("gulp-sass")//sass�ı���
const css = require("gulp-minify-css")//css��ѹ��
const browserify = require("gulp-browserify")//ģ�黯�Ĵ��
const html = require("gulp-htmlmin")//htmlѹ����һ��
const server = require("gulp-webserver")//web����������
const imagemin = require("gulp-imagemin")//ͼƬ��ѹ��
const rev = require("gulp-rev")//���ļ�����MN5��׺
const collector = require("gulp-rev-collector")//·���滻
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
            //�м��
            middleware: function (req, res, next) {
                //���л���ַ ����·��
                const reqPath = url.parse(req.url).pathname;
                const routers = datajson.data();
                //routers�׳�����
                routers.forEach(function (i) {
                    console.log(i.route);
                    console.log(reqPath);
                    if (i.route == reqPath) {
                        i.handle(req, res, next)
                    }
                })
                next()//ִ��next()����
            },
            open: "/html/index.html"
        }));
})
