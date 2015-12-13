class AddSuggestionsToParagraph < ActiveRecord::Migration
  def change
    add_column :paragraphs, :suggested_to, :integer, default: nil
  end
end
