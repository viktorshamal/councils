require 'spec_helper'

describe "meeting_templates/index" do
  before(:each) do
    assign(:meeting_templates, [
      stub_model(MeetingTemplate,
        :name => "Name",
        :color => "Color"
      ),
      stub_model(MeetingTemplate,
        :name => "Name",
        :color => "Color"
      )
    ])
  end

  it "renders a list of meeting_templates" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Color".to_s, :count => 2
  end
end
