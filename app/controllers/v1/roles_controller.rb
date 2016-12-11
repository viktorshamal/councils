class V1::RolesController < V1::BaseController
  def show
    roles = MeetingTemplate.find(params[:id]).roles.where(name: 'moderator').first

    render json: roles
  end

  def create
    authorize :moderator, :create?
    user = User.find(role_params[:user_id])
    template = MeetingTemplate.find(role_params[:meeting_template_id])

    role = user.add_role :moderator, template
    if role
      render status: 200, json: role
    else
      render status: 403, json: {status:'not ok'}
    end
  end

  def destroy
    authorize :moderator, :destroy?
    template = MeetingTemplate.find params[:meeting_template_id]
    user = User.find params[:user_id]

    if user.remove_role :moderator, template
      render json: {status:200}
    else
      render json: {status: 422}
    end
  end

  private
  def role_params
    params.require(:role).permit(:meeting_template_id,:user_id)
  end
end