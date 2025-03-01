"use client";

import { useDebouncedCallback } from "use-debounce";

import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  // without nuqs
  /* const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter(); */
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // with nuqs useQueryState hook
      onChange(event.target.value);

      // without nuqs
      /* const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      }); */
    },
    250
  );

  return (
    <Input
      defaultValue={value}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { SearchInput };
