class Paragraph < ActiveRecord::Base
  has_paper_trail

  validates_presence_of :description

  belongs_to :suggested, class_name: 'Paragraph', foreign_key: 'suggested_to'
  has_many   :suggestions,  class_name: 'Paragraph', foreign_key: 'suggested_to'

  belongs_to :document

  def accept
    ActiveRecord::Base.transaction do
      self.suggested.update_attributes! description: self.description
      self.destroy!
    end
  end

  def author
    User.find(self.paper_trail_originator)
  end
end
