class V1::AttendancesController < V1::BaseController
  before_action :authenticate_user!

  def create
      @meeting = Meeting.find_by_secret(params[:secret])
      if @meeting
        @attendance = Attendance.new(meeting_id: @meeting.id, user_id: current_user.id)
        if @attendance.save
          render json: @attendance, status: 200
        else
          render json: { errors: @attendance.errors.full_messages }, status: 422
        end
      else
        render json: {errors:['Secret not found.']}, status: 404
      end

  end
end
