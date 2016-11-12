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
end
