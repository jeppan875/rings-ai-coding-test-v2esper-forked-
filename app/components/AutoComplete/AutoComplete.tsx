"use client";
import { Input } from "@/app/components/ui/Input";
import { Suggestions } from "./Suggestions";
import { useGraphQL } from "@/app/utils/useGraphQL";
import {
  GetCharactersResponse,
  GetCharactersVariables,
  gqlQuery,
} from "./query";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/app/utils/useClickOutside";

export const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { status, data, error } = useGraphQL<
    GetCharactersResponse,
    GetCharactersVariables
  >(gqlQuery, { name: query });

  console.log('data', data);

  const ref = useRef<HTMLDivElement>(null);

  // Hide suggestions if the autocomplete loses focus
  useClickOutside(ref, () => setOpen(false));

  // If the autocomplete components gets lost focused by tabbing outside, hide the suggestions
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery, query]
  );

  // When clicking an item in the suggestions, add it in the input
  const onItemClick = useCallback(
    (name: string) => {
      setQuery(name);
      setOpen(false);
    },
    [setQuery, setOpen]
  );

  // We only show suggestion if we have some data to show
  const showSuggestions =
    data?.characters.results && data?.characters.results.length > 0 && open;

  return (
    <div ref={ref} className="relative w-full flex">
      <Input
        tabIndex={0}
        onChange={onChange}
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        name="search"
        value={query}
        autoComplete={"off"}
      />
      {showSuggestions && (
        <Suggestions
          handleBlur={handleBlur}
          suggestions={data.characters.results}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
};
