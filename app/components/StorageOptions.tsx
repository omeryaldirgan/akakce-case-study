import { useState } from "react";

interface StorageOptionsProps {
  options: string[];
  onChange: (selected: string) => void;
}

export default function StorageOptions({
  options,
  onChange,
}: StorageOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <fieldset aria-label="Kapasite Seçenekleri" className="mt-2">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-3">
        {options.map((option) => (
          <label
            data-testid={`storage-option-${option}`}
            key={option}
            className={`group relative flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase shadow-xs 
            ${
              selectedOption === option
                ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white"
                : "border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } 
            hover:bg-gray-50 dark:hover:bg-gray-600`}
          >
            <input
              type="radio"
              name="storage-choice"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleSelect(option)}
              className="sr-only"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
