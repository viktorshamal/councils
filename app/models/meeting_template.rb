class MeetingTemplate < ActiveRecord::Base
  belongs_to :council
  has_many :meetings

  validates_presence_of :name, :color, :council_id

  before_validation do
    self.color = '#43B5AD' unless self.color
  end
end
