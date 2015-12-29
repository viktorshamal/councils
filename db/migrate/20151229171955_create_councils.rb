class CreateCouncils < ActiveRecord::Migration
  def change
    create_table :councils do |t|
      t.string :name
      t.string :domain

      t.timestamps null: false
    end
  end
end
