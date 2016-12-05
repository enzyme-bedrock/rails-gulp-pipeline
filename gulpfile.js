var gulp = require('gulp')
var sass = require('gulp-sass')
var rollup = require('rollup-stream');
var babel = require('rollup-plugin-babel')
var sync = require('browser-sync').create()
var source = require('vinyl-source-stream')
var eslint = require('rollup-plugin-eslint')
var uglify = require('rollup-plugin-uglify')
var replace = require('rollup-plugin-replace')
var commonjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')

var is_prod = function() {
  return process.env.NODE_ENV === 'production'
}

gulp.task('sass', function() {
  return gulp
    .src('resources/sass/main.scss')
    .pipe(sass({ outputStyle: is_prod() ? 'compressed' : 'compact' }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(sync.stream())
})

gulp.task('js', function() {
  return rollup({
    entry: 'resources/js/main.js',
    format: 'iife',
    sourceMap: is_prod() ? 'inline' : false,
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      eslint({
        exclude: [
          'resources/sass/**',
        ]
      }),
      babel(),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      (is_prod() && uglify()),
    ],
  })
  .pipe(source('main.js'))
  .pipe(gulp.dest('public/assets/js'))
})

gulp.task('serve', ['js', 'sass'], function() {
  sync.init({
    port: 3030,
    proxy: {
      target: "localhost:3000",
      proxyReq: [
        function(proxyReq) {
            proxyReq.setHeader('X-Forwarded-Host', 'localhost:3030')
        }
      ],
    },
  })

  gulp.watch('resources/sass/**/*', ['sass'])
  gulp.watch('resources/js/**/*', ['js', sync.reload])
  gulp.watch('app/**/*').on('change', sync.reload)
})

gulp.task('build', ['sass', 'js'])

gulp.task('default', ['serve'])
