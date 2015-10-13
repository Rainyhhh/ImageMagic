class AddOrigLinkToImages < ActiveRecord::Migration
  def change
    
    add_column :images, :original_id, :integer
  end
end
