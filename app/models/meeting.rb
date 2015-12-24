class Meeting < ActiveRecord::Base
  validates_presence_of :secret, :name

  has_many :attendances
  has_many :users, through: :attendances

  before_validation(on: :create) do
    self.secret = SecureRandom.base64(10)
  end
end
