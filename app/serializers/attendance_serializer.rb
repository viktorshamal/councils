class AttendanceSerializer < ActiveModel::Serializer
  attributes :meeting_id, :user_id, :hello

  def hello
    'hello'
  end
end