type GameCellProps = {
  value: string | null;
  onClick: () => void;
};

const GameCell = ({ value, onClick }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-28 h-28 p-0 bg-gray-100 border border-black hover:bg-gray-200 text-xl font-semibold text-gray-700"
    >
      {value}
    </button>
  );
};

export default GameCell;
