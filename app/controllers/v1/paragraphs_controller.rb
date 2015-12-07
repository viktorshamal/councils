class V1::ParagraphsController < ApplicationController
  before_action :set_paragraph, only: [:show, :update]

  def index
    @paragraphs = Paragraph.where(document_id: params[:document_id])
    render json: @paragraphs
  end

  def show
    render json: @paragraph
  end

  def update
    @paragraph.update_attributes paragraph_params
    render json: @paragraph
  end

  private

    def set_paragraph
      @paragraph = Paragraph.find(params[:id])
    end

    def paragraph_params
      params.require(:paragraph).permit(:description)
    end
end
