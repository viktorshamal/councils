class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :provider, :uid, :email, :image, :role_names, :is_admin, :is_moderator

  belongs_to :council
end
