import { useEffect, useRef, useState } from 'react';
import { Card } from '../../../../shared/components/Card';
import { Button } from '../../../../shared/components/Button';
import { EmptyState } from '../../../../shared/components/EmptyState';
import { RoadmapCard } from './RoadmapCard';
import { AddRoadmapModal } from './AddRoadmapModal';
import { Plus, Filter, Target } from 'lucide-react';
import { Spinner } from '../../../../shared/components/Spinner';
import ErrorState from '../../../../shared/components/Error/ErrorState';
import FilterModal from './FilterModal';
import SearchBar from '../../../../shared/components/Search/SearchBar';

export const RoadmapList = ({
  infiniteRoadmaps,
  filters,
  setFilters,
  onCreate,
  onUpdate,
  onDelete,
  onSelect,
}) => {
  const {
    data: pages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = infiniteRoadmaps;

  const data = pages?.pages ? pages.pages.flat() : [];

  // Infinite scroll sentinel
  const sentinelRef = useRef(null);
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
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Card
        title="Roadmap"
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
              onClick={() => {
                setEditingRoadmap(null);
                setShowAddModal(true);
              }}
              disabled={!!error}
              className="flex items-center justify-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
              title="Add Roadmap"
            >
              <Plus className="h-4 w-4"/>
              <span className="hidden sm:inline ml-1">New</span>
            </Button>
          </>
        }
      >
        <div className="max-h-120 overflow-y-auto">

          <FilterModal
            show={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            setFilters={setFilters}
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <ErrorState message="Failed to load Roadmaps data." onRetry={refetch} />
          ) : data.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No roadmaps found"
              description="Create your first roadmap to start tracking your progress"
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-2">
              {data.map((roadmap) => (
                <RoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  onDelete={onDelete}
                  onClick={() => onSelect(roadmap.id)}
                  onEdit={(item) => {
                    setEditingRoadmap(item);
                    setShowAddModal(true);
                  }}
                />
              ))}
            </div>
          )}

          {hasNextPage && (
            <div className="flex items-center justify-center mt-6">
              <div ref={sentinelRef} className="h-6"></div>
              {isFetchingNextPage && <Spinner />}
              {!hasNextPage && (
                <div className="text-sm text-gray-500 mt-2">No more roadmaps</div>
              )}
            </div>
          )}
        </div>
      </Card>

      {showAddModal && (
        <AddRoadmapModal
          roadmap={editingRoadmap}
          onClose={() => {
            setShowAddModal(false);
            setEditingRoadmap(null);
          }}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
