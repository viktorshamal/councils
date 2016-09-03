require "spec_helper"

describe MeetingTemplatesController do
  describe "routing" do

    it "routes to #index" do
      get("/meeting_templates").should route_to("meeting_templates#index")
    end

    it "routes to #new" do
      get("/meeting_templates/new").should route_to("meeting_templates#new")
    end

    it "routes to #show" do
      get("/meeting_templates/1").should route_to("meeting_templates#show", :id => "1")
    end

    it "routes to #edit" do
      get("/meeting_templates/1/edit").should route_to("meeting_templates#edit", :id => "1")
    end

    it "routes to #create" do
      post("/meeting_templates").should route_to("meeting_templates#create")
    end

    it "routes to #update" do
      put("/meeting_templates/1").should route_to("meeting_templates#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/meeting_templates/1").should route_to("meeting_templates#destroy", :id => "1")
    end

  end
end
