import { useState } from 'react';
import { MoreVertical, Edit2, Trash2, TrendingUp, TrendingDown, ArrowLeftRight} from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';

export const TransactionCard = ({ transaction, onUpdate, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NPR',
    }).format(amount);
  };

  const transaction_type = transaction.transaction_type;

  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100 sm:items-center sm:p-4">
      
      {/* Transaction Details */}
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">

        <div
          className={`shrink-0 rounded-full p-2.5 sm:p-3 ${
            transaction_type === "income"
              ? "bg-green-100"
              : transaction_type === "transfer"
              ? "bg-blue-100"
              : "bg-red-100"
          }`}
        >
          {transaction_type === "income" ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : transaction_type === "transfer" ? (
            <ArrowLeftRight className="h-5 w-5 text-blue-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
        </div>

        <div className="min-w-0">
          <p className="break-words p-1 font-medium text-gray-900">{transaction.description}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm text-gray-600">{formatDate(transaction.occurred_at)}</span>
            {transaction.category && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                {transaction.category.name}
              </span>
            )}
            {transaction.account && (
              <span className="px-2 py-0.5 bg-blue-100 text-green-800 text-xs rounded-full">
                {transaction.account.name} {transaction_type === 'transfer' && transaction.to_account ? `→ ${transaction.to_account.name}` : ''}
              </span>
            )}
            {transaction.remaining_balance !== undefined && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                Balance: {formatCurrency(transaction.remaining_balance)}
              </span>
            )}
          </div>
        </div>
        
      </div>

      {/* Amount */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-4">
        <p className={`max-w-32 break-words text-right text-sm font-bold sm:max-w-none sm:text-lg ${transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {transaction_type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
        </p>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >            
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              ></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-9999">
                <button
                  onClick={() => {
                    onUpdate?.mutateAsync?.({ id: transaction.id, data: transaction });
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this transaction?')) {
                      onDelete?.mutateAsync?.(transaction.id);
                    }
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};