export function UploadModalFooterButton({
  modalClose,
}: {
  modalClose: () => void;
}) {
  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={modalClose}
        className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-300"
      >
        キャンセル
      </button>
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-300">
        アップロードを確定
      </button>
    </div>
  );
}
