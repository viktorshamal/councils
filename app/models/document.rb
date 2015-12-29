class Document < ActiveRecord::Base
  validates_presence_of :council_id

  belongs_to :council

  has_many :paragraphs
end
