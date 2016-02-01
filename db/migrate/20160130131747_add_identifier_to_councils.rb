class AddIdentifierToCouncils < ActiveRecord::Migration
  def change
    add_column :councils, :identifier, :string
  end
end
