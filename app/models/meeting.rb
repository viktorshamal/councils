class Meeting < ActiveRecord::Base
  validates_presence_of :secret, :name, :council_id, :agenda_drive_id, :summary_drive_id

  belongs_to :council

  has_many :attendances
  has_many :users, through: :attendances

  before_validation(on: :create) do
    self.secret = SecureRandom.base64(10)

    self.agenda_drive_id = DriveWrapper.create_public_document({
      name: "Agenda: #{self.date.strftime('%A, %e. %B %Y')}",
      mime_type: 'application/vnd.google-apps.document'
    })

    self.summary_drive_id = DriveWrapper.create_public_document({
      name: "Summary: #{self.date.strftime('%A, %e. %B %Y')}",
      mime_type: 'application/vnd.google-apps.document'
    })
  end
end
