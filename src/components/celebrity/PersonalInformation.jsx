import { Cake, MapPin, Star } from "lucide-react";

const DetailItem = ({
  icon: Icon,
  label,
  value,
  iconClass = "text-amber-500",
}) => (
  <div className="flex gap-3">
    <Icon className={`w-5 h-5 ${iconClass} shrink-0 mt-0.5`} />
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
);

export const PersonalInformation = ({ actor }) => {
  const birthdayDate = actor.birthday
    ? new Date(actor.birthday).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const deathdayDate = actor.deathday
    ? new Date(actor.deathday).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-6 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">
        Información Personal
      </h2>

      {actor.place_of_birth && (
        <DetailItem
          icon={MapPin}
          label="Lugar de Nacimiento"
          value={actor.place_of_birth}
        />
      )}

      {birthdayDate && (
        <DetailItem
          icon={Cake}
          label="Fecha de Nacimiento"
          value={birthdayDate}
        />
      )}

      {deathdayDate && (
        <DetailItem
          icon={Cake}
          label="Fecha de Fallecimiento"
          value={deathdayDate}
          iconClass="text-rose-500"
        />
      )}

      <DetailItem
        icon={Star}
        label="Departamento Conocido"
        value={actor.known_for_department}
      />
    </div>
  );
};
