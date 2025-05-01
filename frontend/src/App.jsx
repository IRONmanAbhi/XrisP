import { useState } from "react";
import { Search, Leaf, ShoppingBag, Loader } from "lucide-react";

export default function CropProductMatcher() {
  const [cropId, setCropId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    if (!cropId.trim()) {
      setError("Please enter a crop name or ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3001/api/match?cropId=${encodeURIComponent(cropId)}`
      );

      if (!response.ok) {
        throw new Error("Failed to find matching product");
      }

      const data = await response.json();
      setProduct(data);

      // Add to search history if not already there
      if (!searchHistory.includes(cropId)) {
        setSearchHistory((prev) => [cropId, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setCropId(item);
    // Move this item to top of history
    setSearchHistory((prev) =>
      [item, ...prev.filter((i) => i !== item)].slice(0, 5)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Leaf className="text-green-600" size={28} />
            <h1 className="text-3xl font-bold text-green-800">
              Nori Farm Bridge
            </h1>
            <ShoppingBag className="text-green-600" size={24} />
          </div>
          <p className="text-green-700">
            Connect your virtual crops to real products
          </p>
        </header>

        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={cropId}
                onChange={(e) => setCropId(e.target.value)}
                placeholder="Enter crop name or NFT ID (e.g., Tomato #124)"
                className="flex-1 p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:bg-green-400"
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  <Search size={18} />
                )}
                Search
              </button>
            </div>

            {error && (
              <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Product Results */}
            {product && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <div className="rounded-lg overflow-hidden bg-white p-2 border border-green-100">
                      <img
                        src={product.matchedProduct.image}
                        alt={product.matchedProduct.title}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-green-600">
                        Virtual Crop
                      </span>
                      <h2 className="text-lg font-bold text-green-800">
                        {product.crop}
                      </h2>
                    </div>
                    <div className="mb-4">
                      <span className="text-sm font-medium text-green-600">
                        Matched Product
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">
                        {product.matchedProduct.title}
                      </h3>
                      <p className="text-lg font-medium text-gray-700 mt-1">
                        {product.matchedProduct.price}
                      </p>
                    </div>
                    <a
                      href={product.matchedProduct.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryItemClick(item)}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
