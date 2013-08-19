class CreateTodos < ActiveRecord::Migration
  def up
    create_table :todos do |t|
      t.integer :user_id
      t.string :title
      t.datetime :due_date
      t.integer :priority
      t.timestamps
    end
  end

  def down
    drop_database :todos
  end
end
