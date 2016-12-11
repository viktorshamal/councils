class Attendance < ActiveRecord::Base
  belongs_to :user
  belongs_to :meeting

  validates_uniqueness_of :user_id, scope: :meeting_id, message: 'allerede tilmeldt'
end
