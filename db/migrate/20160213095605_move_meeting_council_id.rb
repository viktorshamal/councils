class MoveMeetingCouncilId < ActiveRecord::Migration
  def change
    add_column :meetings, :meeting_template_id, :integer
    add_column :meeting_templates, :council_id, :integer
    remove_column :meetings, :council_id
  end
end
