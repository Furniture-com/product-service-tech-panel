"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { products, Product } from "../constants"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const productsPerPage = 6

  useEffect(() => {
    // Apply filters and sorting
    let result = [...products]

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          case "name-asc":
            return a.name.localeCompare(b.name)
          case "name-desc":
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, sortBy])

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff" }}>Products</h1>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#ffffff" }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#ffffff",
              color: "#161616",
              border: "none",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#ffffff" }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#ffffff",
              color: "#161616",
              border: "none",
            }}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div style={{ color: "#ffffff" }}>
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div
          style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: currentPage === 1 ? "#4b5563" : "#161616",
              color: "#ffffff",
              border: "none",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <span style={{ color: "#ffffff", padding: "0.5rem 1rem" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: currentPage === totalPages ? "#4b5563" : "#161616",
              color: "#ffffff",
              border: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
