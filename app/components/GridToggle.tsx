import Grid3X3 from "lucide-react/Grid3X3";
import Grid2X2 from "lucide-react/Grid2X2";
import LayoutGrid from "lucide-react/LayoutGrid";

const GRID_OPTIONS = [
  { value: 2, icon: Grid2X2 },
  { value: 3, icon: Grid3X3 },
  { value: 4, icon: LayoutGrid },
];

interface GridToggleProps {
  gridCols: number;
  setGridCols: (cols: number) => void;
}

export default function GridToggle({ gridCols, setGridCols }: GridToggleProps) {
  return (
    <div className="flex justify-end mb-4 space-x-2">
      {GRID_OPTIONS.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setGridCols(value)}
          className={`p-2 rounded-lg transition ${
            gridCols === value
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}
