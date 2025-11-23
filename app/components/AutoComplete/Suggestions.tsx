import { GetCharactersResponse, Character } from "./query";

export const Suggestions = ({
  suggestions,
  onItemClick,
  handleBlur,
}: {
  suggestions: GetCharactersResponse["characters"]["results"];
  onItemClick: (item: string) => void;
  handleBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      onBlur={handleBlur}
      className="
    absolute 
    w-full 
    bg-white 
    border border-gray-300 
    rounded-md 
    box-border 
    shadow-md 
    top-[38px]
  "
    >
      <ul className="list-none m-0 p-0">
        {suggestions.map((item) => (
          <Suggestion item={item} onItemClick={onItemClick} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Suggestion = ({
  item,
  onItemClick,
}: {
  item: Character;
  onItemClick: (name: string) => void;
}) => {
  const handleItemKeydown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    // We want to be able to select items using Enter or Space
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onItemClick(item.name);
    }
  };

  const handleItemClick = () => {
    onItemClick(item.name);
  };

  return (
    <li
      role="button"
      tabIndex={0}
      onKeyDown={handleItemKeydown}
      onClick={handleItemClick}
      className="
  z-10 
  px-4 py-2 
  cursor-pointer 
  transition-colors 
  hover:bg-black/5 
  active:bg-black/10
  "
    >
      {item.name}
    </li>
  );
};
