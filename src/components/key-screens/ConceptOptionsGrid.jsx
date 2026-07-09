import ConceptOptionCard from "./ConceptOptionCard.jsx";

export default function ConceptOptionsGrid({ options }) {
  return (
    <div className="-mx-2 overflow-x-auto px-2 pb-4">
      <div className="flex min-w-min items-start gap-5 md:gap-6">
        {options.map((option) => (
          <ConceptOptionCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}
