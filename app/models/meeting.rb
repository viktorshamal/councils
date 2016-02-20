class Meeting < ActiveRecord::Base
  attr_accessor :name, :color

  validates_presence_of :secret, :meeting_template_id, :agenda_drive_id, :summary_drive_id

  belongs_to :meeting_template
  belongs_to :council

  has_many :attendances
  has_many :users, through: :attendances

  after_initialize :inherit_attributes
  before_validation(on: :create) do
    self.secret = SecureRandom.base64(10)
    create_google_documents
  end

  private
  def create_google_documents
    unless self.agenda_drive_id
      self.agenda_drive_id = DriveWrapper.create_public_document({
         name: "Dagsorden: #{self.date.strftime('%A, %e. %B %Y')}",
         mime_type: 'application/vnd.google-apps.document',
     }, Meeting.editors)
    end

    unless self.summary_drive_id
      self.summary_drive_id = DriveWrapper.create_public_document({
          name: "Referat: #{self.date.strftime('%A, %e. %B %Y')}",
          mime_type: 'application/vnd.google-apps.document'
      }, Meeting.editors)
    end
  end

  def inherit_attributes
    inherited_attributes = [:name, :color]
    inherited_attributes.each do |attr|
      next unless self.respond_to?(attr.to_s) && self.meeting_template.respond_to?(attr.to_s)
      self.send(attr.to_s + '=', self.meeting_template.send(attr).to_s)
    end
  end

  def self.editors
    User.with_role(:admin).map(&:email)
  end
end
