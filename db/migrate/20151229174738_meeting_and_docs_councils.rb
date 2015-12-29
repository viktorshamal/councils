class MeetingAndDocsCouncils < ActiveRecord::Migration
  def change
    add_column :documents, :council_id, :integer
    add_column :meetings, :council_id, :integer
  end
end
