class AddAgendaToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :agenda_drive_id, :string
  end
end
