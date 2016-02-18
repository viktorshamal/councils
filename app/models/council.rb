class Council < ActiveRecord::Base
  has_many :users
  has_many :documents

  has_many :meeting_templates
  has_many :meetings, through: :meeting_templates
end
