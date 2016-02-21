class MeetingPolicy < ApplicationPolicy
  def create?
    user.has_role? :moderator, record.meeting_template
  end

  def update?
    user.has_role? :moderator, record.meeting_template
  end

  def destroy?
    user.has_role? :moderator, record.meeting_template
  end
end