class DocumentSerializer < ActiveModel::Serializer
  attributes :id

  has_many :paragraphs
end
