#!/usr/bin/env ruby
# Generates the tiny Jekyll stubs that give each publications.yml record a URL.
# The shared layout reads all visible content and metadata from the YAML record.

require "fileutils"
require "yaml"

root = File.expand_path("..", __dir__)
records = YAML.safe_load(File.read(File.join(root, "_data", "publications.yml")), aliases: false)

records.each do |publication|
  slug = publication.fetch("slug")
  unless slug.match?(/\A[a-z0-9]+(?:-[a-z0-9]+)*\z/)
    abort "Invalid publication slug: #{slug.inspect}"
  end

  directory = File.join(root, "papers", slug)
  FileUtils.mkdir_p(directory)
  File.write(File.join(directory, "index.html"), <<~PAGE)
    ---
    layout: paper
    publication_slug: #{slug}
    permalink: /papers/#{slug}/
    ---
  PAGE
end

puts "Generated #{records.length} paper pages."
