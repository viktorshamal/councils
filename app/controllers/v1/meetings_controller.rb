class V1::MeetingsController < V1::BaseController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_meeting, only: [:show, :update, :destroy]

  def index
    @meetings = Council.find_by_identifier(params[:identifier]).meetings
    render json: @meetings
  end

  def show
    render json: @meeting
  end

  def create
    @meeting = Meeting.new meeting_params

    authorize @meeting

    if @meeting.save
      render json: @meeting, status: :created
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @meeting

    if @meeting.update(meeting_params)
      render json: @meeting, status: :ok
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @meeting

    @meeting.destroy
    render json: {}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meeting_params
      params.require(:meeting).permit(:date, :meeting_template_id)
    end
end
