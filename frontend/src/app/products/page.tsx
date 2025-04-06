"use client"

import { useState, useMemo } from "react"
import ProductCard from "../components/ProductCard"

const products = [
  {
    id: 1,
    name: "Leather Recliner Sofa",
    description: "Luxury leather recliner with cup holders and adjustable headrest.",
    price: 799.99,
    category: "Sofas & Couches",
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1691480152351-4b3f2c89ccff?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Convertible Sofa Bed",
    description: "Space-saving sofa that converts into a bed, with storage compartment.",
    price: 699.99,
    category: "Sofas & Couches",
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1698936061086-2bf99c7b9fc5?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Queen Size Bed",
    description: "Modern wooden platform bed frame with headboard.",
    price: 499.99,
    category: "Beds",
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Memory Foam Mattress",
    description: "Queen-size memory foam mattress with cooling gel technology.",
    price: 399.99,
    category: "Mattresses",
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1640003145136-f998284e11de?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Rustic Wooden Nightstand",
    description: "Handcrafted wooden nightstand with two spacious drawers.",
    price: 89.99,
    category: "Bedroom Furniture",
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1593194632872-3d19dab6e278?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Glass Coffee Table",
    description: "Stylish glass coffee table with chrome legs.",
    price: 159.99,
    category: "Living Room Furniture",
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1647967527216-adea2f078e07?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Velvet Accent Chair",
    description: "Elegant velvet armchair with gold legs, perfect for living rooms.",
    price: 249.99,
    category: "Decor",
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Wall Art Canvas Set",
    description: "3-piece modern abstract wall art set for home decor.",
    price: 79.99,
    category: "Decor",
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
  },
  {
    id: 9,
    name: "Modern Bookshelf",
    description: "Tall wooden bookshelf with five open shelves and a cabinet.",
    price: 299.99,
    category: "Storage & Organization",
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1719310469053-8c5c0c6803d3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Bar Stool Set",
    description: "Set of 2 adjustable-height bar stools with cushioned seats.",
    price: 129.99,
    category: "Dining Furniture",
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1578854888566-a4fde9f0b0e9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
  },
]

const ITEMS_PER_PAGE = 6

type SortOption = "title" | "price-asc" | "price-desc"
type PriceRange =
  | "all"
  | "under-100"
  | "100-500"
  | "500-1000"
  | "1000-3000"
  | "3000-5000"
  | "over-5000"

// Extract unique categories from products
const categories = ["All Categories", ...new Set(products.map((product) => product.category))]

// Price range options
const priceRanges: { value: PriceRange; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under-100", label: "Under $100" },
  { value: "100-500", label: "$100 - $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-3000", label: "$1,000 - $3,000" },
  { value: "3000-5000", label: "$3,000 - $5,000" },
  { value: "over-5000", label: "Over $5,000" },
]

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>("title")
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>("all")

  // Filter products based on selected category and price range
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "All Categories" || product.category === selectedCategory

      // Price range filter
      let priceMatch = true
      if (selectedPriceRange === "under-100") {
        priceMatch = product.price < 100
      } else if (selectedPriceRange === "100-500") {
        priceMatch = product.price >= 100 && product.price <= 500
      } else if (selectedPriceRange === "500-1000") {
        priceMatch = product.price > 500 && product.price <= 1000
      } else if (selectedPriceRange === "1000-3000") {
        priceMatch = product.price > 1000 && product.price <= 3000
      } else if (selectedPriceRange === "3000-5000") {
        priceMatch = product.price > 3000 && product.price <= 5000
      } else if (selectedPriceRange === "over-5000") {
        priceMatch = product.price > 5000
      }

      return categoryMatch && priceMatch
    })
  }, [selectedCategory, selectedPriceRange])

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "title") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "price-asc") {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-normal text-white font-['Poppins']">Our Products</h1>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-white mr-2 font-['Poppins']">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as SortOption)
              setCurrentPage(1) // Reset to first page when sorting changes
            }}
            className="bg-white text-[#161616] border border-[#161616] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#161616]"
          >
            <option value="title">Title (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <label htmlFor="category" className="block text-white mb-2 font-['Poppins']">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              handleFilterChange()
            }}
            className="w-full bg-white text-[#161616] border border-[#161616] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#161616]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label htmlFor="price-range" className="block text-white mb-2 font-['Poppins']">
            Price Range
          </label>
          <select
            id="price-range"
            value={selectedPriceRange}
            onChange={(e) => {
              setSelectedPriceRange(e.target.value as PriceRange)
              handleFilterChange()
            }}
            className="w-full bg-white text-[#161616] border border-[#161616] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#161616]"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full md:w-1/3 mb-8 flex items-end">
        <div className="text-white font-['Poppins']">
          Showing {sortedProducts.length} of {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No results message */}
      {currentProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl font-['Poppins']">
            No products match your filters. Try adjusting your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-[#161616] bg-white border border-[#161616] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-[#161616] text-white"
                  : "bg-white text-[#161616] border border-[#161616] hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-[#161616] bg-white border border-[#161616] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
