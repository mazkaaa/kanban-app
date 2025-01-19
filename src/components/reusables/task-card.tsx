interface PROPS {
  name: string;
  description: string;
  team: string[];
}
export const TaskCard = ({ description, name, team }: PROPS) => {
  return (
    <div className="space-y-4 rounded-lg bg-zinc-800 p-4 text-background dark:bg-zinc-200">
      <section className="">
        <h3 className="text-base font-bold">{name}</h3>
        {description && <p className="text-sm">{description}</p>}
      </section>
      <div className="text-sm">
        {team.map((item, index) => (
          <span
            key={index}
            className="border-b border-dashed border-background"
          >
            {item}
            {index !== team.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};
