class Todo < ActiveRecord::Base
  validates_presence_of :title
  validates_presence_of :priority
  validates_presence_of :due_date
  validates_presence_of :user
  validates_numericality_of :priority, :only_integer => true

  belongs_to :user
end
