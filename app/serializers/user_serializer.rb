class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :provider, :uid, :image
end
