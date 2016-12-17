var elixir = require('laravel-elixir')

elixir.config.assetsPath = 'resources'

elixir(function(mix) {
  mix
  .sass('main.scss')
  .browserify('main.js')
  .browserSync({
    port: 3030,
    files: [
      'app/**/*',
      elixir.config.get('public.css.outputFolder') + '/**/*.css',
      elixir.config.get('public.js.outputFolder') + '/**/*.js',
      elixir.config.get('public.versioning.buildFolder') + '/rev-manifest.json',
    ],
    proxy: {
      target: "localhost:3000",
      proxyReq: [
        function(proxyReq) {
          proxyReq.setHeader('X-Forwarded-Host', 'localhost:3030')
        }
      ],
    },
  })
  .version([
    'css/main.css',
    'js/main.js',
  ])
})
