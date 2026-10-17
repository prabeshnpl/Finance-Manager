import { useState } from 'react';
import { TasksList } from '../components/TasksList';
import { TaskKanban } from '../components/TaskKanban';
import { AddTaskModal } from '../components/AddTaskModal';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { Tabs, TabPanel } from '../../../shared/components/tabs/Tabs';
import { List, LayoutGrid } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { Plus, Filter} from 'lucide-react';
import SearchBar from '../../../shared/components/Search/SearchBar';
import { useTasks } from '../hooks/useTasks';
import FilterModal from '../components/FilterModal';

export const TasksPage = () => {
  const {
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    useInfiniteTasks,
  } = useTasks();

  // Infinite tasks query for list view
  const infiniteTasks = useInfiniteTasks();
  
  const [activeTab, setActiveTab] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    {
      id: 'list',
      label: 'List',
      icon: List,
    },
    {
      id: 'kanban',
      label: 'Kanban',
      icon: LayoutGrid,
    },
  ];

  return (
    <>
      <div className='bg-white rounded-lg shadow-md px-4 pt-1 pb-4'>

        {/* Tabs and Filters*/}
        <div className="flex flex-row md:items-center md:justify-between border-b-2 pb-1 sticky top-0 bg-white">
          
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex items-center justify-end sm:gap-2 flex-wrap md:w-auto">
            
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
              size="sm"
              onClick={() => {
                setEditingTask(null);
                setShowAddModal(true);
              }}
              className="flex items-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
              title="Add Task"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">New</span>
            </Button>

          </div>

          {/* Filters */}
          <FilterModal
            show={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            setFilters={setFilters}
          />

        </div>

        {/* Content */}
        <div className="mt-5 sm:mt-10">
          <TabPanel isActive={activeTab === 'list'}>
            <TasksList
              infiniteTasks={infiniteTasks}
              createTask={createTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </TabPanel>

          <TabPanel isActive={activeTab === 'kanban'}>
            <TaskKanban
              onTaskClick={setSelectedTask}
              onTaskEdit={(taskToEdit) => {
                setSelectedTask(null);
                setEditingTask(taskToEdit);
                setShowAddModal(true);
              }}
              useInfiniteTasks={useInfiniteTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </TabPanel>
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddTaskModal
            onClose={() => {
              setShowAddModal(false);
              setEditingTask(null);
            }}
            onCreate={createTask}
            onUpdate={updateTask}
            task={editingTask}
          />
        )}

        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onEdit={(taskToEdit) => {
              setSelectedTask(null);
              setEditingTask(taskToEdit);
              setShowAddModal(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default TasksPage;
