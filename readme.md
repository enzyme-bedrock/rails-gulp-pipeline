# Rails Gulp Pipeline

## Yarn

```shell
yarn add gulp gulp-sass browser-sync qoob zeus-grid rollup rollup-stream vinyl-source-stream rollup-plugin-babel babel-preset-es2015-rollup rollup-plugin-eslint eslint debug rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify
```

## Rails
### application.rb

```ruby
# Add to class Application < Rails::Application
config.generators do |g|
  g.assets false
end
```
