class Meeting < ActiveRecord::Base
  validates_presence_of :secret, :name, :council_id, :agenda_drive_id

  belongs_to :council

  has_many :attendances
  has_many :users, through: :attendances

  before_validation(on: :create) do
    self.secret = SecureRandom.base64(10)
  end

  before_validation :create_google_documents, on: :create

  def create_google_documents
    permission_callback = lambda { |res, err| self.errors.add(:agenda_drive_id, 'Could not share agenda.') if err }
    file_callback = lambda do |res, err|
      err ? self.errors.add(:agenda_drive_id, 'Could not share agenda.') : self.agenda_drive_id = res.id
    end

    metadata = {
        name: "Agenda: #{self.date.strftime('%A, %e. %B %Y')}",
        mime_type: 'application/vnd.google-apps.document'
    }
    file = GOOGLE_DRIVE.create_file(metadata, content_type: 'text/plain', &file_callback)

    permission = DRIVE::Permission.new(type: 'anyone',role: 'reader')

    GOOGLE_DRIVE.create_permission(file.id, permission, fields: 'id', &permission_callback)
  end
end
