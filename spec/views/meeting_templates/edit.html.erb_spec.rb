require 'spec_helper'

describe "meeting_templates/edit" do
  before(:each) do
    @meeting_template = assign(:meeting_template, stub_model(MeetingTemplate,
      :name => "MyString",
      :color => "MyString"
    ))
  end

  it "renders the edit meeting_template form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", meeting_template_path(@meeting_template), "post" do
      assert_select "input#meeting_template_name[name=?]", "meeting_template[name]"
      assert_select "input#meeting_template_color[name=?]", "meeting_template[color]"
    end
  end
end
