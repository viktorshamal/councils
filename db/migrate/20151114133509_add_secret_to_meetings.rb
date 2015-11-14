class AddSecretToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :secret, :string
  end
end
