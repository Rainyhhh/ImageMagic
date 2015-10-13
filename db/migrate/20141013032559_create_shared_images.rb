class CreateSharedImages < ActiveRecord::Migration
  def change
    create_table :shared_images do |t|
      t.integer :shared_image_id
      t.integer :shared_user_id

      t.timestamps
    end
  end
end
