class CreateParagraphs < ActiveRecord::Migration
  def change
    create_table :paragraphs do |t|
      t.integer :document_id
      t.string :description

      t.timestamps null: false
    end
  end
end
