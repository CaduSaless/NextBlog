
export function Message({ text }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4">
      <p className="text-gray-500">{text}</p>
    </div>
  );
}