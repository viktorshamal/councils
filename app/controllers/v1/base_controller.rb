class V1::BaseController < ApplicationController
  before_filter :set_default_response_format

  private
  def set_default_response_format
    request.format = :json
  end
end