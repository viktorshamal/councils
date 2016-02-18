class RemoveNameFromMeetings < ActiveRecord::Migration
  def change
    remove_column :meetings, :name
  end
end
