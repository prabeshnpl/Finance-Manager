import { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, ArrowLeftRight, ArrowRight} from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';

export const TransactionCard = ({ transaction, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NPR',
    }).format(amount);
  };

  const transaction_type = transaction.transaction_type;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={() => setIsExpanded((expanded) => !expanded)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsExpanded((expanded) => !expanded);
        }
      }}
      className="grid min-w-0 w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4 sm:p-4"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className={`mt-0.5 shrink-0 rounded-full p-2.5 sm:p-3 ${
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
        <p className={`min-w-0 flex-1 text-sm leading-snug text-gray-900 sm:text-base ${
          isExpanded ? 'whitespace-normal wrap-break-word' : 'truncate sm:whitespace-normal sm:wrap-break-word'
        }`}>
          {transaction.description}
        </p>
      </div>

      <div className="flex flex-col items-end">
        {isExpanded ? (
          <div className="mb-1">
            <ChevronUp className="h-5 w-5 text-gray-500" />
          </div>
        ) : (
          <div className="mb-1">
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
        )}
        <p className={`shrink-0 whitespace-nowrap text-right text-xs font-bold leading-tight sm:text-base flex items-center ${transaction_type === 'income' ? 'text-green-600' : transaction_type === 'transfer' ? 'text-blue-600' : 'text-red-600'} ${isExpanded ? 'hidden sm:flex' : 'flex'}`}>
          {transaction_type === 'income' ? 
            <ChevronUp /> : transaction_type === 'expense' ? 
            <ChevronDown/> : <ArrowLeftRight className="h-4 w-4 text-blue-600 mr-1"/>
          }
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
      </div>

      <div
        className={`col-span-full grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:pl-15 ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-3 border-t border-gray-200 pt-3 text-sm text-gray-600 grid-cols-2 lg:grid-cols-3">

            <div className="flex min-w-0 flex-col sm:hidden">
              <span className="text-xs text-gray-400">Amount</span>
              <span className={`font-bold text-xs ${transaction_type === 'income' ? 'text-green-600' : transaction_type === 'transfer' ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(transaction.amount))}
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-gray-400">Date</span>
              <span className='text-xs'>{formatDate(transaction.occurred_at)}</span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-gray-400">Account</span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-xs">{transaction?.account?.name}</span>
                {transaction?.to_account && (
                  <>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                    <span className="truncate text-xs">{transaction.to_account.name}</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-gray-400">Category</span>
              <span className="truncate text-xs">{transaction?.category?.name || '—'}</span>
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-gray-400">Initiated by</span>
              <span className="truncate text-xs">
                {transaction?.initiated_by?.first_name} {transaction?.initiated_by?.last_name}
              </span>
            </div>

            {transaction.remaining_balance !== undefined && (
              <>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs text-gray-400">Initial balance</span>
                  <span className='text-xs'>
                    Rs.{transaction_type == 'income' ? 
                      transaction.remaining_balance - transaction.amount : transaction.remaining_balance + transaction.amount
                    }
                  </span>
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="text-xs text-gray-400">Remaining balance</span>
                  <span className='text-xs'>Rs.{transaction.remaining_balance}</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};