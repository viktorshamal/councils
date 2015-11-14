class Meeting < ActiveRecord::Base
  validates_presence_of :secret

  before_validation(on: :create) do
    generate_secret
  end

  def generate_secret
    self.secret = SecureRandom.base64(10)
  end
end
