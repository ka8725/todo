require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'securerandom'

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

set :public_folder, 'public'

get '/' do
  redirect '/index.html'
end

post '/login.json' do
  if user = User.auth(params[:username], params[:password])
    content_type :json
    {:token => user.token}.to_json
  else
    halt 400, 'user not found'
  end
end


post '/register.json' do
  user = User.new({:username => params[:username], :password => params[:password]})

  if user.save
    'OK'
  else
    halt 400, user.errors.full_messages.to_json
  end
end
