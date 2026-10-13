import React, { useRef, useState } from 'react';
import { useOrganizationstore } from '../../organization/hooks/useOrganizationstore';
import { Check, ChevronDown, Building2 } from 'lucide-react';

export const OrganizationSwitcher = ({ className = '' }) => {
  const { 
    organizations, 
    activeOrganization, 
    loading, 
    switchOrganization 
  } = useOrganizationstore();
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const switcherButtonRef = useRef(null);

  const handleSwitch = async (orgId) => {
    if (orgId === activeOrganization?.id) {
      setIsOpen(false);
      return;
    }

    try {
      setSwitching(true);
      await switchOrganization(orgId);
      setIsOpen(false);
      // Optionally reload the page to refresh all data
      window.location.reload();
    } catch {
      alert('Failed to switch organization');
    } finally {
      setSwitching(false);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      personal: 'Personal',
      family: 'Family',
      business: 'Business'
    };
    return labels[type] || type;
  };

  if (loading || !activeOrganization) {
    return (
      <div
        aria-label="Loading organizations"
        className="h-14 w-56 animate-pulse rounded-lg bg-gray-200"
      />
    );
  }

  return (
    <div className={`relative z-20 ${className}`}>
      <button
        ref={switcherButtonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={switching}
        aria-label={`Switch organization. Current organization: ${activeOrganization.name}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="organization-switcher-menu"
        className="flex min-w-56 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Building2 className="h-5 w-5 shrink-0 text-blue-600" />
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium text-gray-500">
            Switch organization
          </span>
          <span className="text-sm font-medium text-gray-900">
            {activeOrganization.name}
          </span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`ml-auto h-4 w-4 shrink-0 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-54"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="organization-switcher-menu"
            aria-label="Select an organization"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsOpen(false);
                switcherButtonRef.current?.focus();
              }
            }}
            className="absolute left-0 z-55 mt-2 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl"
          >
            <p className="text-sm font-semibold text-gray-900 border-b border-gray-100 px-4 pb-3 pt-2">
                Select an organization
            </p>
            {organizations.map((org) => (
              <button
                type="button"
                key={org.id}
                onClick={() => handleSwitch(org.id)}
                disabled={switching}
                aria-current={org.id === activeOrganization.id ? 'true' : undefined}
                className={`flex w-full items-center justify-between px-4 py-3 text-left border-3 border-gray-300 transition-colors hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none disabled:opacity-50 rounded-lg mb-1 ${
                  org.id === activeOrganization.id ? 'bg-blue-50' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{org.name}</p>
                  <p className="text-xs text-gray-500">{getTypeLabel(org.type)}</p>
                </div>
                {org.id === activeOrganization.id && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    <Check aria-hidden="true" className="h-3 w-3" />
                    Current
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
