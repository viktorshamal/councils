class RoleSerializer < ActiveModel::Serializer
  attributes :resource_id, :user_ids

  def user_ids
    object.users.map do |user|
      {id: object.id, type: object.name, user_id: user.id}
    end
  end
end