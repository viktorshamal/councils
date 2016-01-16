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

  def self.create_public_document(metadata)
    callback = lambda { |res, err| puts err.body if err }

    file = SERVICE.create_file(metadata, content_type: 'text/plain', &callback)

    permission = DRIVE::Permission.new(type: 'anyone',role: 'reader')
    SERVICE.create_permission(file.id, permission, fields: 'id', &callback)

    file.id
  end
end