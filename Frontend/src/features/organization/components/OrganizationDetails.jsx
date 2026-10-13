import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Building2, Edit2, Calendar, User } from 'lucide-react';
import { EditOrganizationModal } from './EditOrganizationModal';
import { formatDate } from '../../../shared/utils/formatDate';

export const OrganizationDetails = ({ organization, canEdit, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const getTypeLabel = (type) => {
    const labels = {
      personal: 'Personal',
      family: 'Family',
      business: 'Business',
    };
    return labels[type] || type;
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      family: 'bg-green-100 text-green-800',
      business: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <section className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h2 className="wrap-break-word text-xl font-semibold text-gray-900">
                  {organization.name}
                </h2>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getTypeBadgeColor(
                    organization.type
                  )}`}
                >
                  {getTypeLabel(organization.type)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-sm text-gray-900">
                  {formatDate(organization.created_at)}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-3">
              <User className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Owner</p>
                <p className="break-all text-sm text-gray-900">
                  {organization.created_by?.email || 'You'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Organization ID</p>
              <p className="break-all text-sm text-gray-900">{organization.id}</p>
            </div>
          </div>

          {canEdit && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowEditModal(true)}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </section>

      {showEditModal && (
        <EditOrganizationModal
          organization={organization}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};