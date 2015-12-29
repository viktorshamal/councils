class Council < ActiveRecord::Base
  has_many :users
  has_many :documents
  has_many :meetings
end
