class User < ActiveRecord::Base
  rolify
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :attendances
  has_many :meetings, through: :attendances

  def role_names
    self.roles.collect(&:name)
  end

  def token_validation_response
    ActiveModel::SerializableResource.new(self).serializable_hash.as_json(except: [:tokens, :created_at, :updated_at])['user']
  end
end
