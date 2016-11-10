class Meeting < ActiveRecord::Base
  resourcify
  attribute :name, :string
  attribute :color, :string
  attribute :timestamp, :string

  validates_presence_of :secret, :meeting_template_id, :agenda_drive_id, :summary_drive_id, :date

  belongs_to :meeting_template
  belongs_to :council

  has_many :attendances
  has_many :users, through: :attendances

  after_initialize :inherit_attributes
  before_validation(on: :create) do
    self.secret = 4.times.map{rand(10)}.join
    create_google_documents
  end

  def editors
    User.with_role(:moderator, self.meeting_template).map(&:email)
  end

  def date=(date)
    if date.is_a? Integer
      date = DateTime.strptime(date.to_s,'%s')
    end
    write_attribute(:date, date)
  end

  private
  def create_google_documents
    unless self.agenda_drive_id
      self.agenda_drive_id = DriveWrapper.create_public_document({
         name: "Dagsorden: #{self.date.strftime('%A, %e. %B %Y')}",
         mime_type: 'application/vnd.google-apps.document',
     }, self.editors)
    end

    unless self.summary_drive_id
      self.summary_drive_id = DriveWrapper.create_public_document({
          name: "Referat: #{self.date.strftime('%A, %e. %B %Y')}",
          mime_type: 'application/vnd.google-apps.document'
      }, self.editors)
    end
  end

  def inherit_attributes
    inherited_attributes = [:name, :color]
    inherited_attributes.each do |attr|
      next unless self.respond_to?(attr.to_s) && self.meeting_template.respond_to?(attr.to_s)
      #e.g: self.color = self.meeting_template.color
      self.send(attr.to_s + '=', self.meeting_template.send(attr).to_s)
    end
  end
end
