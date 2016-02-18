class V1::MeetingTemplatesController < V1::BaseController
  before_action :set_meeting_template, only: [:show, :edit, :update, :destroy]
  #before_action :authenticate_user!

  # GET /meeting_templates
  # GET /meeting_templates.json
  def index
    @meeting_templates = Council.find_by_identifier(params[:identifier]).meeting_templates
    render json: @meeting_templates
  end

  def show
    render json: @meeting_template
  end

  def create
    @meeting_template = MeetingTemplate.new(meeting_template_params)
    if @meeting_template.save!
      render json: @meeting_template
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting_template
      @meeting_template = MeetingTemplate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meeting_template_params
      params.require(:meeting_template).permit(:name, :color)
    end
end
