import React, { useState, useEffect, useRef } from "react";
import {
  Combobox,
  Option,
  OptionGroup,
} from "@fluentui/react-components";
import { useNavSearchStyles } from "./NavSearch.styles";
import type { SearchSuggestion } from "../TopNav/types";

export interface NavSearchProps {
  /** Called when user types 3+ chars (debounced 300ms from last keypress) */
  onSearchQuery: (query: string) => SearchSuggestion[] | Promise<SearchSuggestion[]>;
  /** Called when user selects a suggestion or presses Enter on a non-empty query */
  onSearchNavigate: (href: string) => void;
}

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 3;

// Group suggestions by category
function groupByCategory(
  suggestions: SearchSuggestion[]
): Record<string, SearchSuggestion[]> {
  return suggestions.reduce<Record<string, SearchSuggestion[]>>(
    (acc, suggestion) => {
      if (!acc[suggestion.category]) {
        acc[suggestion.category] = [];
      }
      acc[suggestion.category].push(suggestion);
      return acc;
    },
    {}
  );
}

export const NavSearch: React.FC<NavSearchProps> = ({
  onSearchQuery,
  onSearchNavigate,
}) => {
  const styles = useNavSearchStyles();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // T031: 300ms debounce — fires onSearchQuery 300ms after last keypress
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (query.length >= MIN_QUERY_LENGTH) {
      debounceTimer.current = setTimeout(async () => {
        const results = await onSearchQuery(query);
        setSuggestions(results);
      }, DEBOUNCE_MS);
    } else {
      setSuggestions([]);
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, onSearchQuery]);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    data: { value: string }
  ) => {
    setQuery(data.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // FR-006/FR-007: Enter with non-empty query navigates; empty = no-op
    if (e.key === "Enter" && query.trim().length > 0) {
      onSearchNavigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleOptionSelect = (
    _: React.SyntheticEvent,
    data: { optionValue?: string }
  ) => {
    const suggestion = suggestions.find((s) => s.id === data.optionValue);
    if (suggestion) {
      onSearchNavigate(suggestion.href);
      setQuery("");
      setSuggestions([]);
    }
  };

  const grouped = groupByCategory(suggestions);
  const categories = Object.keys(grouped) as Array<"Projects" | "Reports" | "People">;

  return (
    // Not wrapped in <Field> — nav bar search is not a form input context.
    // aria-label directly on Combobox satisfies WCAG 2.1 SC 1.3.1.
    <Combobox
      aria-label="Search"
      placeholder="Search"
      value={query}
      freeform
      className={styles.combobox}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onOptionSelect={handleOptionSelect}
      // Show listbox only when there are suggestions
      open={suggestions.length > 0}
    >
      {categories.map((category) => (
        <OptionGroup key={category} label={category}>
          {grouped[category].map((suggestion) => (
            <Option key={suggestion.id} value={suggestion.id}>
              {suggestion.label}
            </Option>
          ))}
        </OptionGroup>
      ))}
    </Combobox>
  );
};
