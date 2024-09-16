export function EnvFileSelectButton({ open }: { open: () => void }) {
  return (
    <button
      className="bg-black text-white rounded-lg py-2 px-4 mt-2"
      onClick={open}
    >
      envファイルを選択
    </button>
  );
}
