class RoleSerializer < ActiveModel::Serializer
  attributes :id, :name, :resource_id, :resource_type, :users

end