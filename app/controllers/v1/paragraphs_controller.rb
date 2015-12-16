class V1::ParagraphsController < V1::BaseController
  before_action :set_paragraph, only: [:show, :update, :previous_version, :destroy, :accept]
  before_action :authenticate_user!, except: [:index, :show, :previous_version]

  def index
    @paragraphs = Paragraph.where(document_id: params[:document_id], 'suggested_to' => nil)
    render json: @paragraphs
  end

  def show
    render json: @paragraph
  end

  def previous_version
    render json: @paragraph.previous_version
  end

  def create
    @paragraph = Paragraph.new paragraph_params
    @paragraph.document_id = params[:document_id]
    if @paragraph.save
      render json: @paragraph
    else
      render json: {error: 'error'}
    end
  end

  def update
    authorize @paragraph
    @paragraph.update_attributes paragraph_params
    render json: @paragraph
  end

  def accept
    authorize @paragraph
    if @paragraph.accept
      render json: {}, status: 200
    else
      render json: {}, status: 500
    end
  end

  def destroy
    authorize @paragraph
    if @paragraph.destroy
      render json: {}, status: 200
    else
      render json: {}, status: 500
    end
  end

  private
    def set_paragraph
      @paragraph = Paragraph.find(params[:id])
    end

    def paragraph_params
      params.require(:paragraph).permit(:description, :suggested_to)
    end
end
