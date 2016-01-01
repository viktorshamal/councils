class AddDateToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :date, :datetime
  end
end
