class V1::UsersController < ApplicationController
  def index
    @users = if(params[:meeting_id])
      Meeting.find(params[:meeting_id]).users
    else
      User.all
    end

    render json: @users
  end

  def show

  end
end
