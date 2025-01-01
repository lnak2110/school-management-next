type OptionType = {
  value: string;
  label: string;
};

type RoleSelectProps = {
  options: OptionType[];
  onChange: (value: string) => void;
  selectValue: string;
};

export default function RoleSelect({
  options,
  onChange,
  selectValue,
}: RoleSelectProps) {
  return (
    <div className="relative mx-auto w-72 max-w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute bottom-0 right-3 top-0 my-auto h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <select
        value={selectValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm text-gray-600 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
