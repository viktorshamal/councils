class V1::AttendancesController < V1::BaseController
  before_action :authenticate_user, only: [:create, :token]

  def create
      meeting = Meeting.find(params[:meeting_id])
      if params[:code] == meeting.current_code
        attendance = Attendance.new(meeting_id: meeting.id, user_id: current_user.id)
        if attendance.save
          render json: formatted(attendance.meeting_id), status: 200
        else
          render json: { errors: attendance.errors.full_messages }, status: 422
        end
      else
        render json: {errors:['Forkert kode']}, status: 422
      end

  end

  def show
    render json: formatted(params[:id])
  end

  def token
    meeting = Meeting.find(params[:id])
    render json: meeting.current_token
  end

  private
  def formatted(id)
    attendances = Attendance.where(meeting_id: id)
    user_ids = attendances.map(&:user_id)
    hash = Hash[id,user_ids]
    {attendance: hash}
  end
end
