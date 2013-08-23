class User < ActiveRecord::Base
  has_secure_password

  validates :username, :presence => true
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
