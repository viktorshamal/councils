class V1::DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :destroy]

  def index
    @document = Document.all
    render json: @document
  end

  def show
    render json: @document
  end

  def create
    @document = Document.new

    if @document.save
      render json: @document, status: :created
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @document.destroy
      render json: {}, status: 200
    else
      render json: {}, status: 500
    end
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
