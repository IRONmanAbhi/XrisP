const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const productDatabase = {
  tomato: {
    title: "Organic Heirloom Tomato Box",
    price: "18,500 KRW",
    image:
      "https://images.unsplash.com/photo-1621872320869-bed3257199ab?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/organic-tomatoes",
  },
  cucumber: {
    title: "Fresh Cucumber Pack",
    price: "6,000 KRW",
    image:
      "https://images.unsplash.com/photo-1611048661702-7b55eed346b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/cucumber-pack",
  },
  carrot: {
    title: "Premium Organic Carrots",
    price: "7,200 KRW",
    image:
      "https://images.unsplash.com/photo-1723476992266-2c4a787c7b32?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/premium-carrots",
  },
  lettuce: {
    title: "Hydroponic Lettuce Head",
    price: "3,500 KRW",
    image:
      "https://images.unsplash.com/photo-1621460249485-4e4f92c9de5d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/hydroponic-lettuce",
  },
  apple: {
    title: "Premium Fuji Apples",
    price: "24,000 KRW",
    image:
      "https://plus.unsplash.com/premium_photo-1669557208945-640032289d5c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/fuji-apples",
  },
  strawberry: {
    title: "Sweet Strawberry Gift Box",
    price: "32,000 KRW",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800",
    buyLink: "https://shop.example.com/products/strawberry-gift-box",
  },
  blueberry: {
    title: "Organic Blueberry Pack",
    price: "15,000 KRW",
    image:
      "https://images.unsplash.com/photo-1690894789192-1d2488f9cf2b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/organic-blueberries",
  },
  rice: {
    title: "Premium Korean Rice",
    price: "45,000 KRW",
    image:
      "https://plus.unsplash.com/premium_photo-1701011134121-2c102821765d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/premium-rice",
  },
  wheat: {
    title: "Organic Whole Wheat Flour",
    price: "12,000 KRW",
    image:
      "https://plus.unsplash.com/premium_photo-1663851784707-a49e85c2361f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buyLink: "https://shop.example.com/products/organic-wheat-flour",
  },
};

// Helper function to extract crop name from NFT ID format
function extractCropName(cropId) {
  // Handle formats like "Tomato #124" or just "Tomato"
  const match = cropId.match(/^([a-zA-Z]+)(\s+#\d+)?$/);
  if (match) {
    return match[1].toLowerCase();
  }
  return cropId.toLowerCase();
}

// API endpoint to match crops to products
app.get("/api/match", (req, res) => {
  const { cropId } = req.query;

  if (!cropId) {
    return res.status(400).json({ error: "Crop ID is required" });
  }

  // Extract crop name from the ID
  const cropName = extractCropName(cropId);

  // Find matching product in our database
  const matchedProduct = productDatabase[cropName];

  if (!matchedProduct) {
    return res.status(404).json({
      error: "No matching product found",
      message: `Could not find a product match for "${cropId}"`,
    });
  }

  // Return the matched product info
  return res.json({
    crop: cropId,
    matchedProduct,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send(
    "Nori Farm Bridge API - Use /api/match?cropId=YOUR_CROP_ID to find matching products"
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
