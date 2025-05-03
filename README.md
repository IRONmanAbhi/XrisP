# Nori Farm Bridge

## Overview

The Nori Farm Bridge is a web application that connects virtual crop NFTs to real agricultural products available for purchase. It allows users to search for their virtual crop by name or NFT ID (e.g., "Tomato #124") and returns matching real-world products with details including price, image, and purchase link.

## System Architecture

The application uses a client-server architecture with:

1. **Backend API**: A Node.js Express server
2. **Frontend UI**: A React-based user interface

## Backend Functionality

The backend provides a RESTful API with the following features:

- **Product Database**: Contains details for various agricultural products including tomatoes, cucumbers, carrots, lettuce, apples, strawberries, blueberries, rice, and wheat. Each product entry stores:

  - Title
  - Price (in KRW)
  - Product image URL
  - Purchase link

- **API Endpoints**:

  - `/api/match`: Matches crop names from NFTs to products in the database
  - `/`: Basic root endpoint with API usage instructions

- **Crop Name Extraction**: Uses regex pattern matching to extract the base crop name from various formats (e.g., "Tomato #124" becomes "tomato")

- **Cross-Origin Resource Sharing (CORS)**: Enabled to allow frontend access

- **Error Handling**: Returns appropriate error responses for missing parameters or unmatched products

## Frontend Interface

The React frontend provides a user-friendly interface with these components:

- **Search Functionality**: Input field to enter crop name or NFT ID with a search button
- **Product Display**: Shows matching product information including:
  - Virtual crop name
  - Product image
  - Product title
  - Price
  - "Buy Now" button linking to the product page
- **Search History**: Displays up to 5 recent searches as clickable chips for easy re-searching
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Displays user-friendly error messages when searches fail

## Data Flow

1. User enters a crop name or NFT ID in the search field
2. Frontend sends a request to the backend API
3. Backend extracts the crop name and searches the product database
4. If found, product information is returned to the frontend
5. Frontend displays the matching product details
6. User can click "Buy Now" to navigate to the product purchase page
7. Recent searches are saved in the frontend's state for quick access

## Technical Implementation

- **Backend**: Node.js with Express
- **Frontend**: React with Lucide React icons for UI elements
- **State Management**: React useState hooks
- **API Communication**: Fetch API
- **Styling**: Tailwind CSS classes for responsive design

## Use Case

This application bridges the gap between virtual farming experiences (possibly NFT-based games or digital collectibles) and real-world agricultural products, allowing users to purchase physical versions of their virtual crops.
