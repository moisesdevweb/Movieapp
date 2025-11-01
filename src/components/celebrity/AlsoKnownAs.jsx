export const AlsoKnownAs = ({ aliases }) => (
  <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-6">
    <h2 className="text-xl font-bold text-white mb-4">También Conocido Como</h2>
    <div className="flex flex-wrap gap-2">
      {aliases.map((alias, index) => (
        <span
          key={index}
          className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-sm"
        >
          {alias}
        </span>
      ))}
    </div>
  </div>
);
