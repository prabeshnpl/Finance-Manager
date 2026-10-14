import { useRef } from 'react';
import { CategoryManager } from '@/features/category/pages/CategoryManager';
import { Button } from '../../../../shared/components/Button';
import { Plus, Tag } from 'lucide-react';

export const FinanceSettings = () => {

    const categoryAddActionRef = useRef(null);

    return (
        <section className="space-y-6">
            <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                  <Tag className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Settings</h1>
                  <p className="mt-1 text-sm text-slate-600">Manage the categories used to organize your finances.</p>
                </div>
              </div>
                <Button
                  size="sm"
                  onClick={() => categoryAddActionRef.current?.()}
                  className="h-10 w-full shrink-0 px-3 text-sm sm:w-auto"
                >
                  <span className="inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </span>
                </Button>
            </header>
            <CategoryManager addActionRef={categoryAddActionRef} />
        </section>
    )
};
export default FinanceSettings;
