import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export const CelebrityHeader = ({ name }) => (
  <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
    <div className="px-6 py-4 flex items-center gap-4">
      <Link
        to="/trending-persons"
        className="p-2 hover:bg-slate-800 rounded-lg transition"
      >
        <ArrowLeft className="w-5 h-5 text-slate-400 hover:text-white" />
      </Link>
      <h1 className="text-2xl font-bold text-white">{name}</h1>
    </div>
  </header>
);
