class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.string :user_id
      t.string :meeting_id

      t.timestamps null: false
    end
  end
end
