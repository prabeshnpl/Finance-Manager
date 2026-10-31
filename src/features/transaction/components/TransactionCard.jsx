import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, ArrowLeftRight, ArrowRight} from 'lucide-react';
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
    <div className="grid min-w-0 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] sm:gap-6 sm:p-4">

      {/* Inidicator Icon and Descriptions */}
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
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:pl-5">

          <p className="line-clamp-2 h-10 w-full overflow-hidden text-sm leading-snug text-gray-900 sm:h-12 sm:text-base">
            {transaction.description}
          </p>

          <div className="flex min-w-0 flex-col">
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
      </div>

      {/* Account and Category */}
      <div className="hidden min-w-0 flex-col items-start gap-2 sm:flex sm:pl-5">
          <div className="flex min-w-0 items-center gap-3 text-xs text-gray-500">
            <span className="truncate">{transaction?.account?.name}</span>
            {transaction?.to_account && 
              <>
                <ArrowRight className="h-5 w-5 shrink-0" />
                <span className="truncate">{transaction?.to_account?.name}</span>
              </>}
          </div>

          <div className="w-full truncate text-sm text-gray-500">
            {transaction?.category?.name}
          </div>
          
          <div className="w-full truncate text-sm text-gray-500">
            {transaction?.initiated_by?.first_name} {transaction?.initiated_by?.last_name}
          </div>
      </div>      

      {/* Transaction Amount */}
      <div className="flex min-w-fit justify-end">
        <p className={`flex shrink-0 items-center gap-2 whitespace-nowrap pt-1 text-right text-xs font-bold leading-tight sm:pt-0 sm:text-base ${transaction_type === 'income' ? 'text-green-600' : transaction_type === 'transfer' ? 'text-blue-600' : 'text-red-600'}`}>
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