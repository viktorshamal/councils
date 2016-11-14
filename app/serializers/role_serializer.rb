class RoleSerializer < ActiveModel::Serializer
  attributes :id, :name, :resource_id, :resource_type, :user_ids

  def user_ids
    object.users.map(&:id)
  end
end