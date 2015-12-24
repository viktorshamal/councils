class ParagraphSerializer < ActiveModel::Serializer
  attributes :id, :description, :suggested_to

  has_many :suggestions
  has_one :author
end
