require 'spec_helper'

describe "meeting_templates/show" do
  before(:each) do
    @meeting_template = assign(:meeting_template, stub_model(MeetingTemplate,
      :name => "Name",
      :color => "Color"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/Color/)
  end
end
