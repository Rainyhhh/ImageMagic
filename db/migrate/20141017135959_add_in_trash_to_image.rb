class AddInTrashToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :in_trash, :boolean, :default => 0
  end
end
