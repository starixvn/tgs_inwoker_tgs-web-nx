import { useState } from "react";

export function useGameSearch() {
  const [searchString, setSearchString] = useState("");

  const handleChangeSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  return {
    searchString,
    handleChangeSearch,
  };
}
