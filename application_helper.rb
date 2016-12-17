require 'json'

module ApplicationHelper
  def initializer
    super
    @rev_cache = nil
  end

  def asset(path)
    @rev_cache ||= parse_rev_manifest

    "/public/build/#{@rev_cache[path]}"
  end

  private

  def parse_rev_manifest
    file = File.read "#{Rails.root}/public/build/rev-manifest.json"
    JSON.parse file
  end
end
