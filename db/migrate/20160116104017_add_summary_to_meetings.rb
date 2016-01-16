class AddSummaryToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :summary_drive_id, :string
  end
end
