import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, ArrowLeftRight} from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';

export const TransactionCard = ({ transaction, onUpdate, onDelete }) => {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NPR',
    }).format(amount);
  };

  const transaction_type = transaction.transaction_type;

  return (
    <div className="flex min-w-0 gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100 sm:gap-2.5 sm:p-4 items-start">

      {/* Inidicator Icon */}
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
      
      {/* Descriptions */}
      <div className="flex flex-col flex-1 min-w-0 items-start justify-between sm:pl-5 gap-3">

        <p className="flex justify-start  text-sm leading-snug text-gray-900 sm:text-base">
          {transaction.description}
        </p>

        <div className='flex flex-col'>
          <span className="shrink-0 text-[10px] sm:text-sm text-gray-500">
            {formatDate(transaction.occurred_at)}
          </span>
          {transaction.remaining_balance !== undefined && (
            <span className="max-w-full truncate text-[10px] sm:text-sm text-gray-600">
              <span>Remaining Balance: </span>
              Rs.{transaction.remaining_balance}
            </span>
          )}
        </div>

      </div>

      {/* Transaction Amount */}
      <div className="flex justify-end min-w-0 flex-row flex-wrap items-start gap-1.5 sm:gap-3">

          <p className={`flex items-center gap-2 max-w-28 wrap-break-word pt-1 text-right text-xs font-bold leading-tight sm:max-w-none sm:pt-0 sm:text-base ${transaction_type === 'income' ? 'text-green-600' : transaction_type === 'transfer' ? 'text-blue-600' : 'text-red-600'}`}>
            {transaction_type === 'income' ? 
              <ChevronUp /> : transaction_type === 'expense' ? 
              <ChevronDown/> : <ArrowLeftRight className="h-4 w-4 text-blue-600"/>
            }
            {formatCurrency(Math.abs(transaction.amount))}
          </p>

      </div>

    </div>
  );
};