require 'rubygems'
require 'sinatra'

set :public, '.'

get '/' do
  redirect '/example.html'
end