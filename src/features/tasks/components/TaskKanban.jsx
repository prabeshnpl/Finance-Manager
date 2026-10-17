import React, { useEffect, useRef } from 'react';
import { TaskCard } from './TaskCard';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorState } from '@/shared/components/Error/ErrorState';

const columns = [
  { id: 'pending', title: 'To Do', color: 'gray' },
  { id: 'in_progress', title: 'In Progress', color: 'blue' },
  { id: 'completed', title: 'Completed', color: 'green' },
];

const colorClasses = {
  gray: 'border-gray-300',
  blue: 'border-blue-300',
  green: 'border-green-300',
};

const KanbanColumn = ({ column, useInfiniteTasks, onTaskClick, onTaskEdit, onUpdate, onDelete }) => {
  const {
    data: pages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteTasks({ status: column.id });

  const data = pages?.pages ? pages.pages.flat() : [];
  const sentinelRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || !fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { root, threshold: 1 });

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex h-full min-h-0 w-[78vw] shrink-0 flex-col md:w-auto md:flex-1 md:shrink">
      <div className={`shrink-0 bg-white rounded-lg shadow-md p-4 border-t-4 ${colorClasses[column.color]} mb-3`}>
        <h3 className="font-semibold text-gray-900 flex items-center justify-between">
          <span>{column.title}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {pages?.pages?.at(-1)?.meta?.total_count || 0}
          </span>
        </h3>
      </div>
      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain pr-1 touch-pan-x touch-pan-y"
      >
        {isLoading ? (
          <div className="flex justify-center py-4"><Spinner /></div>
        ) : error ? (
          <div className="p-2">
            <ErrorState message="Failed to load tasks." onRetry={refetch} />
          </div>
        ) : data?.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 text-sm">
            No tasks
          </div>
        ) : (
          data.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onClick={() => onTaskClick(task)}
              onEdit={onTaskEdit}
            />
          ))
        )}
        {hasNextPage && (
          <div ref={sentinelRef} className="flex h-8 shrink-0 items-center justify-center">
            {isFetchingNextPage && <Spinner />}
          </div>
        )}
      </div>
    </div>
  );
};

export const TaskKanban = ({
  onTaskClick,
  onTaskEdit,
  useInfiniteTasks,
  updateTask: onUpdate,
  deleteTask: onDelete,
}) => {
  return (
    <div className="h-[min(70dvh,42rem)] min-h-80 min-w-0">
      <div className="flex h-full gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 touch-pan-x touch-pan-y md:overflow-x-hidden md:overscroll-x-auto">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            useInfiniteTasks={useInfiniteTasks}
            onTaskClick={onTaskClick}
            onTaskEdit={onTaskEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
