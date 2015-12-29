class User < ActiveRecord::Base
  rolify
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :attendances
  has_many :meetings, through: :attendances

  belongs_to :council

  before_validation :assign_council, on: :create
  validates_presence_of :council_id

  def role_names
    self.roles.collect(&:name)
  end

  # overrides devise_token_auths default because we didn't want the root key.
  def token_validation_response
    ActiveModel::SerializableResource.new(self).serializable_hash.as_json(except: [:tokens, :created_at, :updated_at])['user']
  end

  def assign_council
    domain = self.email.split('@').last
    council = Council.find_by_domain(domain)
    council ? self.council_id = council.id : self.errors.add(:council, "Email domain doesn't match any council.")
  end
end
