class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :provider, :uid, :email, :image, :role_names

  belongs_to :council
end
