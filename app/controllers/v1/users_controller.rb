class V1::UsersController < V1::BaseController
  def index
    @users = if params[:meeting_id]
      Meeting.find(params[:meeting_id]).user_ids
    else
      Council.find_by_identifier(identifier).users.order(:name)
    end

    render json: @users
  end

  def moderators
    template = MeetingTemplate.find params[:meeting_template_id]
    @users = User.with_role :moderator, template
    render json: @users
  end
end