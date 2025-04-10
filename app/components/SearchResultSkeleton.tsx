export default function SearchResults() {
  return (
    <div
      className="flex max-w-xs flex-col items-center justify-between rounded-lg border p-4"
    >
      <h3 className="text-md text-ellipsis font-medium md:text-clip">...</h3>
      <div
        className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View Details
      </div>
    </div>
  );
}
