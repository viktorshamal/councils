class MeetingPolicy < ApplicationPolicy
  def create?
    user.is_admin? || user.has_role?(:moderator, record.meeting_template)
  end

  def update?
    user.is_admin? || user.has_role?(:moderator, record.meeting_template)
  end

  def destroy?
    user.is_admin? || user.has_role?(:moderator, record.meeting_template)
  end
end