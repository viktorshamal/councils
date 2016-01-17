module DriveWrapper
  require 'googleauth'
  require 'google/apis/drive_v3'

  scopes = %w(https://www.googleapis.com/auth/cloud-platform
              https://www.googleapis.com/auth/compute
              https://www.googleapis.com/auth/drive)
  authorization = Google::Auth.get_application_default(scopes)

  DRIVE = Google::Apis::DriveV3
  SERVICE = DRIVE::DriveService.new
  SERVICE.authorization = authorization

  def self.create_public_document(metadata, editors)
    file = SERVICE.create_file(metadata, content_type: 'text/plain')

    permissions = editors.map do |editor|
      DRIVE::Permission.new(
          type:'user',
          role: 'writer',
          email_address: editor
      )
    end

    permissions << DRIVE::Permission.new(
        type: 'anyone',
        role: 'reader'
    )

    SERVICE.batch do |service|
      permissions.each {|perm| service.create_permission(file.id, perm)}
    end

    file.id
  end
end