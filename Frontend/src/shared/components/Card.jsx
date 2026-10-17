export const Card = ({ children, className = '', title, action }) => {
  return (
    <div className={`min-w-0 bg-white rounded-lg shadow-md ${className} h-full`}>

      {title && (
        <div className="sticky top-0 z-10 flex flex-row rounded-lg border border-gray-200 bg-white px-4 py-3  md:items-center md:justify-between md:gap-4 md:px-6 md:py-2">

          <h3 className="min-w-0 text-lg font-bold leading-tight text-slate-900 sm:text-xl lg:text-2xl flex items-center">{title}</h3>
          
          {action && <div className="flex justify-end items-center sm:gap-3">{action}</div>}

        </div>
      )}

      <div className="h-full min-w-0 p-2 sm:p-6">{children}</div>

    </div>
  );
};