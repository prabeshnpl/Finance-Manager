import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/EmptyState';
import { MemberCard } from './MemberCard';
import { InviteMemberModal } from './InviteMemberModal';
import { UserPlus, Users } from 'lucide-react';
import { Spinner } from '../../../shared/components/Spinner';
import ErrorState from '../../../shared/components/Error/ErrorState';

export const MembersList = ({
  members,
  currentMember,
  canManageMembers,
  onInvite,
  onUpdate,
  onRemove,
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const {data, isLoading, error, refetch} = members;

  if (isLoading) {
    return (
      <section className="flex min-h-40 items-center justify-center p-6">
        <Spinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-5 sm:p-6">
        <ErrorState message="Failed to load organization members." onRetry={refetch} />
      </section>
    );
  }

  return (
    <>
      <section className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Members ({data.length})
          </h2>
          {canManageMembers && (
            <Button
              className="flex items-center"
              size="sm"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          )}
        </div>
        {data.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No members yet"
            description="Invite team members to collaborate in this organization"
            action={
              canManageMembers && (
                <Button onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              )
            }
          />
        ) : (
          <div className="space-y-3 flex flex-wrap justify-start gap-4">
            {data.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                currentMember={currentMember}
                canManageMembers={canManageMembers}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </section>

      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          onInvite={onInvite}
        />
      )}
    </>
  );
}
