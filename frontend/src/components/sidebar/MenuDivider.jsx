// Componente MenuDivider para separar secciones en el sidebar
export default function MenuDivider({ isCollapsed }) {
  return (
    <div className={`${isCollapsed ? 'mx-2' : 'mx-4'} my-4`}>
      <div className="h-px bg-gray-800" />
    </div>
  );
}