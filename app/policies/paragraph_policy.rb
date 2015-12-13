class ParagraphPolicy < ApplicationPolicy
  def update?
    user.is_admin?
  end

  def destroy?
    user.is_admin?
  end

  def accept?
    user.is_admin?
  end
end