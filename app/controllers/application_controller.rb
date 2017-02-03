class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  protect_from_forgery with: :null_session

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    render json: {error: 'You are not authorized to perform this action.'}, status: 403
  end

  def identifier
    @identifier ||= ((params[:identifier].present? && params[:identifier]) || ENV['DEFAULT_COUNCIL'])
  end

  def council
    matches = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/.match(request.original_url)
    subdomain = matches ? matches[1] : nil
    council = subdomain ? Council.find_by_identifier(subdomain) : nil
    council ? council : Council.find_by_identifier(identifier)
  end
end
