import React from 'react';

export const StatsCard = ({ title, value, icon, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    yellow: 'bg-amber-50 text-amber-600',
    red: 'bg-rose-50 text-rose-600',
    purple: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 xl:p-6">
        <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
                <p className="mb-1 text-sm text-gray-500">{title}</p>
                <p className="wrap-break-word text-xl font-bold text-gray-900 sm:text-2xl">{value}</p>
                {trend && (
                <p className={`mt-2 wrap-break-word text-xs sm:text-sm ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trend.value}
                </p>
                )}
            </div>
            <div className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${colorClasses[color]}`}>
                {icon ? React.createElement(icon, { className: "h-6 w-6 sm:h-8 sm:w-8" }) : null}
            </div>
        </div>
    </div>
);
}
