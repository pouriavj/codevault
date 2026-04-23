export default function SnippetLoadingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="relative inline-block w-20 h-20 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-300 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin [animation-delay:-0.3s]"></div>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-4 break-words">
          Loading...
        </h2>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed break-words">
          We're fetching your data. Please stand by.
        </p>
      </div>
    </div>
  );
}
