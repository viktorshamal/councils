class MeetingSerializer < ActiveModel::Serializer
  #serialization_scope :current_user
  attributes :id, :secret, :name

  # def attributes(x)
  #   data = super
  #   unless current_user.is_admin?
  #     data.delete(:secret)
  #   end
  #   data
  # end

  has_many :users
end
