class V1::BaseController < ApplicationController
  include ReactOnRails::Controller

  before_filter :set_default_response_format
  before_filter :set_paper_trail_whodunnit

  private
  def set_default_response_format
    #request.format = :json
  end

  def identifier
    @identifier ||= ((params[:identifier].present? && params[:identifier]) || ENV['DEFAULT_COUNCIL'])
  end
end