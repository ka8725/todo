require 'sinatra'
require 'json'
require 'yaml'
require 'sinatra/activerecord'
require 'securerandom'
require 'bcrypt'
require 'debugger'

dbconfig = (YAML.load_file('config/database.yml') || {}).merge(:encoding => 'utf8')
ActiveRecord::Base.establish_connection(dbconfig)

before { content_type :json }

class User < ActiveRecord::Base
  has_secure_password

  validates :username, :password, :presence => true
  validates :username, :uniqueness => true

  has_many :todos

  def self.auth(username, pwd)
    find_by_username(username).try(:authenticate, pwd)
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
  validates_presence_of :title
  validates_presence_of :priority
  validates_presence_of :due_date
  validates_presence_of :user
  validates_numericality_of :priority, :only_integer => true

  belongs_to :user
end

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


post '/register' do
  user = User.new({
    :username => params[:username],
    :password => params[:password],
    :password_confirmation => params[:password]
  })

  if user.save
    {:user => user}.to_json
  else
    halt 422, {:errors => user.errors}.to_json
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
