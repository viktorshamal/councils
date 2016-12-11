class MeetingSerializer < ActiveModel::Serializer
  #serialization_scope :current_user
  attributes :id, :name, :date, :agenda_drive_id, :summary_drive_id, :color, :user_ids

  # def attributes(x)
  #   data = super
  #   unless current_user.is_admin?
  #     data.delete(:secret)
  #   end
  #   data
  # end

  def user_ids
    object.user_ids
  end

  #has_many :users
end
