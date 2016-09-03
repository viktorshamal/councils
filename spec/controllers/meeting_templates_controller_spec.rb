require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

describe MeetingTemplatesController do

  # This should return the minimal set of attributes required to create a valid
  # MeetingTemplate. As you add validations to MeetingTemplate, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) { { "name" => "MyString" } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # MeetingTemplatesController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all meeting_templates as @meeting_templates" do
      meeting_template = MeetingTemplate.create! valid_attributes
      get :index, {}, valid_session
      assigns(:meeting_templates).should eq([meeting_template])
    end
  end

  describe "GET show" do
    it "assigns the requested meeting_template as @meeting_template" do
      meeting_template = MeetingTemplate.create! valid_attributes
      get :show, {:id => meeting_template.to_param}, valid_session
      assigns(:meeting_template).should eq(meeting_template)
    end
  end

  describe "GET new" do
    it "assigns a new meeting_template as @meeting_template" do
      get :new, {}, valid_session
      assigns(:meeting_template).should be_a_new(MeetingTemplate)
    end
  end

  describe "GET edit" do
    it "assigns the requested meeting_template as @meeting_template" do
      meeting_template = MeetingTemplate.create! valid_attributes
      get :edit, {:id => meeting_template.to_param}, valid_session
      assigns(:meeting_template).should eq(meeting_template)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new MeetingTemplate" do
        expect {
          post :create, {:meeting_template => valid_attributes}, valid_session
        }.to change(MeetingTemplate, :count).by(1)
      end

      it "assigns a newly created meeting_template as @meeting_template" do
        post :create, {:meeting_template => valid_attributes}, valid_session
        assigns(:meeting_template).should be_a(MeetingTemplate)
        assigns(:meeting_template).should be_persisted
      end

      it "redirects to the created meeting_template" do
        post :create, {:meeting_template => valid_attributes}, valid_session
        response.should redirect_to(MeetingTemplate.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved meeting_template as @meeting_template" do
        # Trigger the behavior that occurs when invalid params are submitted
        MeetingTemplate.any_instance.stub(:save).and_return(false)
        post :create, {:meeting_template => { "name" => "invalid value" }}, valid_session
        assigns(:meeting_template).should be_a_new(MeetingTemplate)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        MeetingTemplate.any_instance.stub(:save).and_return(false)
        post :create, {:meeting_template => { "name" => "invalid value" }}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested meeting_template" do
        meeting_template = MeetingTemplate.create! valid_attributes
        # Assuming there are no other meeting_templates in the database, this
        # specifies that the MeetingTemplate created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        MeetingTemplate.any_instance.should_receive(:update).with({ "name" => "MyString" })
        put :update, {:id => meeting_template.to_param, :meeting_template => { "name" => "MyString" }}, valid_session
      end

      it "assigns the requested meeting_template as @meeting_template" do
        meeting_template = MeetingTemplate.create! valid_attributes
        put :update, {:id => meeting_template.to_param, :meeting_template => valid_attributes}, valid_session
        assigns(:meeting_template).should eq(meeting_template)
      end

      it "redirects to the meeting_template" do
        meeting_template = MeetingTemplate.create! valid_attributes
        put :update, {:id => meeting_template.to_param, :meeting_template => valid_attributes}, valid_session
        response.should redirect_to(meeting_template)
      end
    end

    describe "with invalid params" do
      it "assigns the meeting_template as @meeting_template" do
        meeting_template = MeetingTemplate.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        MeetingTemplate.any_instance.stub(:save).and_return(false)
        put :update, {:id => meeting_template.to_param, :meeting_template => { "name" => "invalid value" }}, valid_session
        assigns(:meeting_template).should eq(meeting_template)
      end

      it "re-renders the 'edit' template" do
        meeting_template = MeetingTemplate.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        MeetingTemplate.any_instance.stub(:save).and_return(false)
        put :update, {:id => meeting_template.to_param, :meeting_template => { "name" => "invalid value" }}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested meeting_template" do
      meeting_template = MeetingTemplate.create! valid_attributes
      expect {
        delete :destroy, {:id => meeting_template.to_param}, valid_session
      }.to change(MeetingTemplate, :count).by(-1)
    end

    it "redirects to the meeting_templates list" do
      meeting_template = MeetingTemplate.create! valid_attributes
      delete :destroy, {:id => meeting_template.to_param}, valid_session
      response.should redirect_to(meeting_templates_url)
    end
  end

end