// Componente MenuItem.jsx - Representa un ítem del menú en el sidebar
export default function MenuItem({ icon: Icon, label, isActive, isCollapsed, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
        isActive
          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >

      {Icon && <Icon className="w-5 h-5 " />}
      
      {!isCollapsed && (
        <>
          <span className="font-medium">{label}</span>
          {badge && (
            <span className="ml-auto bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          {label}
          {badge && (
            <span className="ml-2 bg-purple-500 px-2 py-0.5 rounded-full text-xs">
              {badge}
            </span>
          )}
        </div>
      )}
    </button>
  );
}