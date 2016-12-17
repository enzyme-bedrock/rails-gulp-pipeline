# app/helpers/application_helper.rb

require 'json_file_reader'

module ApplicationHelper
  def asset(path)
    @rev_cache ||= JsonFileReader.parse "#{Rails.root}/public/build/rev-manifest.json"

    "/build/#{@rev_cache[path]}"
  end
end
