class HomeController < ApplicationController
  include ReactOnRails::Controller

  #caches_page :index

  def index
    meetings = council.meetings
    meeting_templates = council.meeting_templates.order(:name)
    redux_store('meetingsStore', props: {meetings: meetings, meeting_templates: meeting_templates,council:council})
  end
end
