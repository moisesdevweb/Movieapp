import { useState } from "react";
import { Star, MoreVertical, Trash2, Edit2, Reply, Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ReviewCard({ review, isReply = false, onDelete, onUpdate, onReply }) {
  const { user } = useAuth();
  
  // Estado local para manejar la edición y el menú de cada tarjeta independientemente
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editContent, setEditContent] = useState(review.content);

  const handleSaveEdit = () => {
    onUpdate(review.id, editContent);
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(review.content); // Restaurar texto original
    setMenuOpen(false);
  };

  // Verificamos si el usuario actual es dueño o admin
  const canEdit = user?.id === review.userId || user?.role === 'admin';

  return (
    <div className={`group flex gap-4 animate-in slide-in-from-bottom-2 duration-300 ${isReply ? "ml-12 mt-3 border-l-2 border-gray-800 pl-4" : "mt-6"}`}>
      {/* Avatar */}
      <div className={`${isReply ? "w-8 h-8 text-xs" : "w-10 h-10"} rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white shrink-0 shadow-lg border border-gray-600`}>
        {review.user?.name?.charAt(0).toUpperCase() || "U"}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm hover:underline cursor-pointer">
              {review.user?.name || "Usuario"}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Menú de Opciones */}
          {canEdit && (
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-gray-800"
              >
                <MoreVertical size={16} />
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 top-6 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                  <button 
                    onClick={() => { setIsEditing(true); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white text-left"
                  >
                    <Edit2 size={14} /> Editar
                  </button>
                  <button 
                    onClick={() => { onDelete(review.id); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 text-left"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              )}
              
              {/* Overlay invisible para cerrar menú al hacer clic fuera */}
              {menuOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)}></div>
              )}
            </div>
          )}
        </div>

        {/* Área de Texto o Edición */}
        <div className="mt-1">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea 
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-gray-800 border border-purple-500/50 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                rows="3"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={handleCancelEdit}
                  className="text-xs text-gray-400 hover:text-white px-3 py-1 flex items-center gap-1"
                >
                  <X size={12} /> Cancelar
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
                >
                  <Check size={12} /> Guardar
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {review.content}
              </p>
              
              {/* Botones inferiores (Estrellas y Responder) */}
              <div className="flex items-center gap-4 mt-2">
                {!isReply && (
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} />
                    ))}
                  </div>
                )}
                
                {/* Botón Responder (Solo mostramos en padres por ahora) */}
                {!isReply && user && (
                  <button 
                    onClick={() => onReply(review.id, review.user?.name)}
                    className="text-xs text-gray-500 hover:text-purple-400 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Reply size={12} /> Responder
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}