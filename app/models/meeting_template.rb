class MeetingTemplate < ActiveRecord::Base
  belongs_to :council
  has_many :meetings
end
