import { useState } from 'react';
import { TasksList } from '../components/TasksList';
import { TaskKanban } from '../components/TaskKanban';
import { AddTaskModal } from '../components/AddTaskModal';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { Tabs, TabPanel } from '../../../shared/components/tabs/Tabs';
import { List, LayoutGrid } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { Plus, Filter} from 'lucide-react';
import { Card } from '../../../shared/components/Card';
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
      label: 'List View',
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
      <Card>
        {/* Tabs */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-wrap md:items-center">
            <SearchBar
              placeholder="Search tasks..."
              value={filters.search || ''}
              onSubmit={(value) => setFilters({ ...filters, search: value || null })}
              className="col-span-2 h-10 w-full min-w-0 md:col-span-1 md:w-56"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-center md:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              size="sm"
              onClick={() => {
                setEditingTask(null);
                setShowAddModal(true);
              }}
              className="h-10 w-full justify-center md:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Add Task</span>
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
      </Card>
    </>
  );
};

export default TasksPage;
