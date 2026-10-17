import { useState, useEffect, useRef } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { TransactionCard } from '../components/TransactionCard';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { Plus, Filter, Receipt } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import FilterModal from '../components/FilterModal';
import ErrorState from '@/shared/components/Error/ErrorState';
import SearchBar from '@/shared/components/Search/SearchBar';
import { useTransaction } from '../hooks/useTransaction';
import { useCategory } from '../../category/hooks/useCategory';

export const TransactionsPage = () => {
  const {
    useInfiniteTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    filters,
    setFilters,
    accounts,
    exportTransactions,
  } = useTransaction();

  const { categories, createCategory, updateCategory, deleteCategory, categoryBreakdown } = useCategory();

  const infiniteTransactions = useInfiniteTransactions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sentinelRef = useRef(null);

  const { 
    data: pages, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    refetch 
  } = infiniteTransactions;

  const data = pages?.pages ? pages.pages.flat() : [];

  // Intersection observer to auto-fetch next page
  useEffect(() => {
    if (!fetchNextPage) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1 });

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading){
    return <Spinner size="md" />;
  }
  if (error){
    return <ErrorState message="Failed to load transactions." onRetry={refetch} />;
  }
  return (
    <>
      <Card
        // title={`Transactions (${pages?.pages?.at(-1)?.meta?.total_count || 0})`}
        title={`Transactions`}
        action={
          <>
            <SearchBar
              placeholder="Search..."
              value={filters.search || ''}
              onSubmit={(value) => setFilters({ ...filters, search: value || null })}
              className="w-1/2 min-w-0 md:w-56 md:flex-1 md:max-w-md"
            />

            <Button
              size="xs"
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              title="Filter"
              className="flex items-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Filter</span>
            </Button>

            <Button 
              size="xs" 
              onClick={() => setShowAddModal(true)} 
              className="flex items-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
              title="Add Transaction"
            >
              <Plus className="h-4 w-4"/>
              <span className="hidden sm:inline ml-1">New</span>
            </Button>
          </>
        }
      >
        {/* Filters */}
        <FilterModal
          show={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          setFilters={setFilters}
          accounts={accounts?.data || []}
          categories={categories?.data || []}
        />

        {/* Transactions List */}
        { data?.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No transactions yet"
            description="Start tracking your income and expenses"
            iconClassNames="h-8 w-8 text-gray-400"
          />
        ) : (
          <div className="space-y-3">
            {data.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onUpdate={updateTransaction}
                onDelete={deleteTransaction}
              />
            ))}
          </div>
        )}
        {/* Infinite sentinel */}
        <div className="flex items-center justify-center mt-6">
          <div ref={sentinelRef} className="h-6"></div>
          {isFetchingNextPage && <Spinner />}
          {!hasNextPage && (
            <div className="text-sm text-gray-500 mt-2">No more transactions</div>
          )}
        </div>
      </Card>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onCreate={createTransaction}
          categories={categories}
          createCategory={createCategory}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          accounts={accounts}
        />
      )}
    </>
  );
};
