class ChangeInTrashToImage < ActiveRecord::Migration
  def self.up
    change_column :images, :in_trash, :boolean, :default => false
  end
end
