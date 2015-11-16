class ChangeKeysToIntegerInAttendance < ActiveRecord::Migration
  def change
    remove_column :attendances, :user_id
    remove_column :attendances, :meeting_id
    add_column :attendances, :user_id, :integer
    add_column :attendances, :meeting_id, :integer
  end
end
