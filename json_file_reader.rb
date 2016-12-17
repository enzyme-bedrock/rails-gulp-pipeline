# app/lib/json_file_reader.rb

require 'json'

class JsonFileReader
  def self.parse(path_to_file)
    JSON.parse File.read(path_to_file)
  end
end
