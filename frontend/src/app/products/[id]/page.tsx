"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import StarIcon from "../../components/StarIcon"
import { products, Product } from "../../constants"
import { use } from "react"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const productId = unwrappedParams.id

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = () => {
      const foundProduct = products.find((p) => p.id === parseInt(productId))
      setProduct(foundProduct || null)
      setLoading(false)
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Loading product details...
      </div>
    )
  }

  if (!product) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Product Not Found
        </h1>
        <p style={{ marginBottom: "1.5rem" }}>The product you're looking for doesn't exist.</p>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "#161616",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
          }}
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "#ffffff",
            marginBottom: "1rem",
            textDecoration: "none",
          }}
        >
          <span style={{ marginRight: "0.5rem" }}>←</span> Back to Products
        </Link>
      </div>

      <div className="product-detail-grid">
        {/* Product Image */}
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover", borderRadius: "0.5rem" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            {product.name}
          </h1>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-[#f59e0b]"
                      : i < product.rating
                      ? "text-[#fbbf24]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span style={{ fontSize: "0.875rem", color: "#9ca3af", marginLeft: "0.5rem" }}>
              ({product.rating})
            </span>
          </div>

          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            ${product.price.toFixed(2)}
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#161616",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            {product.category}
          </div>

          <p style={{ color: "#ffffff", marginBottom: "1.5rem" }}>{product.description}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.875rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "9999px",
                ...(product.stock > 0
                  ? { backgroundColor: "#dcfce7", color: "#166534" }
                  : { backgroundColor: "#fee2e2", color: "#991b1b" }),
              }}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <button
            style={{
              backgroundColor: "#161616",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              width: "100%",
              marginBottom: "1.5rem",
            }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          Product Details
        </h2>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ color: "#161616", marginBottom: "1rem" }}>{product.details}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#161616",
                  marginBottom: "0.5rem",
                }}
              >
                Dimensions
              </h3>
              <p style={{ color: "#4b5563" }}>{product.dimensions}</p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#161616",
                  marginBottom: "0.5rem",
                }}
              >
                Materials
              </h3>
              <p style={{ color: "#4b5563" }}>{product.materials}</p>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          Features
        </h2>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            padding: "1.5rem",
          }}
        >
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#4b5563" }}>
            {product.features?.map((feature: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
