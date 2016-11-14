class V1::RolesController < V1::BaseController
  def index
    roles = MeetingTemplate.find(params[:meeting_template_id]).roles.where(name: 'moderator')

    render json: roles
  end

  def create
    authorize :moderator, :create?
    user = User.find(params[:user_id])
    template = MeetingTemplate.find(params[:meeting_template_id])

    if user.add_role :moderator, template
      render status: 200, json: {status:'ok'}
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
end