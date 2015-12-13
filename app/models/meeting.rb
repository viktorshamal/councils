class Meeting < ActiveRecord::Base
  validates_presence_of :secret

  has_many :attendances
  has_many :users, through: :attendances

  before_validation(on: :create) do
    generate_secret
  end

  def generate_secret
    self.secret = SecureRandom.base64(10)
  end

  def self.attend

  end
end
