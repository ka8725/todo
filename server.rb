require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'securerandom'
require 'debugger'

# ActiveRecord::Base.include_root_in_json = true

before { content_type :json }

db = URI.parse('postgres://ka8725:@localhost/todos')

ActiveRecord::Base.establish_connection(
  :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
  :host     => db.host,
  :username => db.user,
  :password => db.password,
  :database => db.path[1..-1],
  :encoding => 'utf8'
)


class User < ActiveRecord::Base
  validates :username, :password, :presence => true
  validates :username, :uniqueness => true

  has_many :todos

  def self.auth(username, pwd)
    find_by_username_and_password(username, pwd)
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
    halt 400, 'user not found'
  end
end


post '/register' do
  user = User.new({:username => params[:username], :password => params[:password]})

  if user.save
    'OK'
  else
    halt 400, user.errors.full_messages.to_json
  end
end


get '/todos' do
  if current_user
    {:todos => current_user.todos}.to_json
  else
    halt 403, 'user not found or token is not provided'
  end
end

post '/todos' do
  if current_user
    ps = JSON.parse(request.body.read)
    todo = current_user.todos.build(ps['todo'])

    if todo.save
      'OK'
    else
      halt 400, {:errors => todo.errors}.to_json
    end
  else
    halt 403, 'user not found or token is not provided'
  end
end

def current_user
  @current_user ||= User.find_by_token(env['HTTP_X_ACCESS_TOKEN'])
end
