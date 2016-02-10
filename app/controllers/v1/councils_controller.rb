class V1::CouncilsController < V1::BaseController
  def index
    @councils = Council.all
    render json: @councils
  end
end