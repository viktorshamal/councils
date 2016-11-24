class V1::TokensController < V1::BaseController
  before_action :authenticate_user!

  def create

  end

  def show
    meeting = Meeting.find(params[:meeting_id])
    render json: meeting.current_token
  end
end
