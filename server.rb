require 'sinatra'
require 'json'
require 'yaml'
require 'sinatra/activerecord'
require 'securerandom'
require 'bcrypt'

require_relative 'models/user'
require_relative 'models/todo'

dbconfig = (YAML.load_file('config/database.yml') || {}).merge(:encoding => 'utf8')
ActiveRecord::Base.establish_connection(dbconfig)

before { content_type :json }

set :public_folder, 'public'

get '/' do
  content_type :html
  send_file File.join(settings.public_folder, 'index.html')
end

post '/login' do
  if user = User.auth(params[:username], params[:password])
    {:token => user.token}.to_json
  else
    halt 400, {:error => 'user not found'}.to_json
  end
end

post '/users' do
  user_params = body_params('user')
  user = User.new(user_params.merge('password_confirmation' => user_params['password']))
  user.save ? {:user => user}.to_json : unresponsible_entity(user)
end

get '/todos' do
  with_current_user do
    {:todos => current_user.todos}.to_json
  end
end

post '/todos' do
  with_current_user do
    todo = current_user.todos.build(body_params('todo'))
    todo.save ? {:todo => todo}.to_json : unresponsible_entity(todo)
  end
end

get '/todos/:id' do
  with_current_user do
    todo = current_user.todos.find(params[:id])
    {:todo => todo}.to_json
  end
end

put '/todos/:id' do
  with_current_user do
    todo = current_user.todos.find(params[:id])
    todo.update_attributes(body_params('todo')) ? {:todo => todo}.to_json : unresponsible_entity(todo)
  end
end

delete '/todos/:id' do
  with_current_user do
    todo = current_user.todos.find(params[:id])
    todo.destroy ? {:todo => todo}.to_json : unresponsible_entity(todo)
  end
end

def current_user
  @current_user ||= User.find_by_token(env['HTTP_X_ACCESS_TOKEN'])
end

def with_current_user
  if current_user
    yield
  else
    halt 403, {:error => 'Token is not provided or expired. Please logout and login again'}.to_json
  end
end

def body_params(model)
  JSON.parse(request.body.read)[model]
end


def unresponsible_entity(model)
  halt 422, {:errors => model.errors}.to_json
end
