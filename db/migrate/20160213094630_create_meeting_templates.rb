class CreateMeetingTemplates < ActiveRecord::Migration
  def change
    create_table :meeting_templates do |t|
      t.string :name
      t.string :color

      t.timestamps null: false
    end
  end
end
