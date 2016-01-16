=begin
require 'googleauth'
require 'google/apis/drive_v3'

# Get the environment configured authorization
scopes = %w(https://www.googleapis.com/auth/cloud-platform
            https://www.googleapis.com/auth/compute
            https://www.googleapis.com/auth/drive)
authorization = Google::Auth.get_application_default(scopes)

# Add the the access token obtained using the authorization to a hash, e.g
# headers.
some_headers = {}
authorization.apply(some_headers)

DRIVE = Google::Apis::DriveV3 # Alias the module
GOOGLE_DRIVE = DRIVE::DriveService.new
GOOGLE_DRIVE.authorization = authorization # See Googleauth or Signet libraries


=end
