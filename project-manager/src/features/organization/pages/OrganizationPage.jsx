import { useOrganizationStore } from '../../../stores/organizationStore';
import { useOrganizations } from '../hooks/useOrganization';
import { OrganizationDetails } from '../components/OrganizationDetails';
import { MembersList } from '../components/MembersList';
import { OrganizationSwitcher } from '@/features/organization/components/OrganizationSwitcher';

export const OrganizationPage = () => {
  const { activeOrganization } = useOrganizationStore();
  const {
    members,
    currentMember,
    inviteMember,
    updateMember,
    removeMember,
    updateOrganization,
    canManageMembers,
    canEditOrganization,
  } = useOrganizations();

  if (!activeOrganization) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-amber-900">No active organization selected</p>
            <OrganizationSwitcher />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className=" space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Organization</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your organization details and members.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <OrganizationSwitcher />
          {currentMember && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
              Your role: {currentMember.role.charAt(0).toUpperCase() +
                currentMember.role.slice(1)}
            </span>
          )}
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <OrganizationDetails
          organization={activeOrganization}
          canEdit={canEditOrganization}
          onUpdate={updateOrganization}
        />
        <div className="border-t border-gray-200" />
        <MembersList
          members={members}
          currentMember={currentMember}
          canManageMembers={canManageMembers}
          onInvite={inviteMember}
          onUpdate={updateMember}
          onRemove={removeMember}
        />
      </div>
    </main>
  );
};