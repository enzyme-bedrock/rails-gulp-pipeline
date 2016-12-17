require 'json'

module ApplicationHelper
  def initialize(*args)
    super
    @rev_cache = parse_rev_manifest
  end

  def asset(path)
    "/public/build/#{@rev_cache[path]}"
  end

  private

  def parse_rev_manifest
    JSON.parse File.read("#{Rails.root}/public/build/rev-manifest.json")
  end
end
