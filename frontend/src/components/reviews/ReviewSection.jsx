import { useState, useEffect, useRef } from "react";
import { Star, MessageSquare, Send, LogIn, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getMovieReviews, createReview, deleteReview, updateReview } from "../../services/reviewService";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ReviewCard from "./ReviewCard"; // <--- Importamos el componente separado

export default function ReviewSection({ movieId, movieTitle, movieImage }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const commentBoxRef = useRef(null);
  
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); 

  useEffect(() => {
    if (movieId) loadReviews();
  }, [movieId]);

  const loadReviews = async () => {
    try {
      const response = await getMovieReviews(movieId);
      setReviews(response.data || []);
    } catch (error) {
      console.error("Error cargando reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await createReview({
        content: comment,
        rating: replyingTo ? null : rating,
        movieId,       
        movieTitle,    
        movieImage,
        parentId: replyingTo 
      }, token);

      toast.success(replyingTo ? "Respuesta publicada" : "Comentario publicado");
      setComment("");
      setReplyingTo(null); 
      loadReviews(); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funciones simplificadas para pasar al hijo
  const handleDelete = async (reviewId) => {
    if (!confirm("¿Seguro que quieres eliminar este comentario?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteReview(reviewId, token);
      toast.success("Comentario eliminado");
      loadReviews();
    } catch (error) { toast.error(error.message); }
  };

  const handleUpdate = async (reviewId, newContent) => {
    try {
      const token = localStorage.getItem("token");
      await updateReview(reviewId, newContent, null, token); // null en rating para mantener el original
      toast.success("Comentario actualizado");
      loadReviews();
    } catch (error) { toast.error(error.message); }
  };

  const handleReplyClick = (reviewId, authorName) => {
    setReplyingTo(reviewId);
    setComment(`@${authorName} `);
    commentBoxRef.current?.focus();
    commentBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Título */}
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <div className="bg-purple-600/20 p-2 rounded-lg">
            <MessageSquare className="text-purple-500 w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          Comentarios <span className="text-gray-500 text-lg ml-2">{reviews.length}</span>
        </h3>
      </div>

      {/* Lista de Comentarios */}
      <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        {/* Renderizar Padre usando el nuevo componente */}
                        <ReviewCard 
                            review={review} 
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            onReply={handleReplyClick}
                        />
                        
                        {/* Renderizar Hijos */}
                        {review.replies && review.replies.length > 0 && (
                            <div className="border-l-2 border-gray-800 ml-5">
                                {review.replies.map(reply => (
                                    <ReviewCard 
                                        key={reply.id} 
                                        review={reply} 
                                        isReply={true}
                                        onDelete={handleDelete}
                                        onUpdate={handleUpdate}
                                        onReply={handleReplyClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center py-16 text-gray-500">
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p>Sé el primero en opinar.</p>
                </div>
            )}
        </div>

        {/* Input Fijo */}
        <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-md p-6">
            {user ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                    {replyingTo && (
                        <div className="flex justify-between items-center bg-purple-500/10 px-3 py-1 rounded-lg text-xs text-purple-300 border border-purple-500/20 animate-in slide-in-from-bottom-1">
                            <span>Respondiendo a comentario...</span>
                            <button type="button" onClick={() => { setReplyingTo(null); setComment(""); }} className="hover:text-white"><X size={14}/></button>
                        </div>
                    )}
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="relative group">
                                <textarea
                                    ref={commentBoxRef}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={replyingTo ? "Escribe tu respuesta..." : `Comparte tu opinión, ${user.name}...`}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none h-24"
                                />
                                {!replyingTo && (
                                    <div className="absolute right-3 bottom-3 flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => setRating(star)} className="hover:scale-110 transition-transform">
                                                <Star size={18} className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    disabled={loading} 
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
                                >
                                    {loading ? "Enviando..." : <><Send size={16} /> Publicar</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-lg">
                    <div>
                        <h4 className="text-white font-bold text-sm">Inicia sesión para comentar</h4>
                        <p className="text-gray-400 text-xs">Únete a la comunidad de Cinematrix</p>
                    </div>
                    <button 
                        onClick={() => navigate('/login', { state: { from: location } })}
                        className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                        <LogIn size={16} /> Entrar
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}