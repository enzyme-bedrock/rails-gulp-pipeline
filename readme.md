# Rails Gulp Pipeline

## Yarn

```shell
yarn add gulp laravel-elixir laravel-elixir-browserify-official laravel-elixir-browsersync-official
```

## Rails
### application.rb

```ruby
# Add to class Application < Rails::Application
config.generators do |g|
  g.assets false
end
```
