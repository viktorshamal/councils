class V1::DocumentsController < ApplicationController
  before_action :set_document, only: [:show]

  # GET /meetings
  # GET /meetings.json
  def index
    @document = Document.all
    render json: @document
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
    render json: @document
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def document_params
      params[:document]
    end
end
