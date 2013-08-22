require 'sinatra'
require 'json'
require 'yaml'
require 'sinatra/activerecord'
require 'securerandom'
require 'bcrypt'
require 'debugger'

# ActiveRecord::Base.include_root_in_json = true

dbconfig = (YAML.load_file('config/database.yml') || {}).merge(:encoding => 'utf8')
ActiveRecord::Base.establish_connection(dbconfig)

before { content_type :json }

class User < ActiveRecord::Base
  has_secure_password

  validates :username, :password, :presence => true
  validates :username, :uniqueness => true

  has_many :todos

  def self.auth(username, pwd)
    find_by_username(username) if user.authenticate(pwd)
  end

  def token
    new_token.tap do |t|
      update_column(:token, t)
    end
  end

  private

  def new_token
    SecureRandom.hex
  end
end

class Todo < ActiveRecord::Base
  validates :title, :presence => true
  validates :priority, :presence => true
  validates :due_date, :presence => true

  belongs_to :user
end

set :public_folder, 'public'

get '/' do
  redirect '/index.html'
end

post '/login' do
  if user = User.auth(params[:username], params[:password])
    {:token => user.token}.to_json
  else
    halt 400, {:error => 'user not found'}.to_json
  end
end


post '/register' do
  user = User.new({:username => params[:username], :password => params[:password]})

  if user.save
    user.to_json
  else
    halt 422, user.errors.to_json
  end
end


get '/todos' do
  with_current_user do
    {:todos => current_user.todos}.to_json
  end
end

post '/todos' do
  with_current_user do
    todo = current_user.todos.build(todo_params)

    if todo.save
      {:todo => todo}.to_json
    else
      halt 422, {:errors => todo.errors}.to_json
    end
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
    if todo.update_attributes(todo_params)
      {:todo => todo}.to_json
    else
      halt 422, {:errors => todo.errors}.to_json
    end
  end
end

delete '/todos/:id' do
  with_current_user do
    todo = current_user.todos.find(params[:id])

    if todo.destroy
      {:todo => todo}.to_json
    else
      halt 422, todo.errors.to_json
    end
  end
end

def current_user
  @current_user ||= User.find_by_token(env['HTTP_X_ACCESS_TOKEN'])
end


def with_current_user
  if current_user
    yield
  else
    halt 403, {:error => 'user not found or token is not provided'}.to_json
  end
end

def todo_params
  JSON.parse(request.body.read)['todo']
end
