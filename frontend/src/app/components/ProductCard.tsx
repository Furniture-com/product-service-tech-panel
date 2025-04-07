"use client"

import Image from "next/image"
import Link from "next/link"
import StarIcon from "./StarIcon"
import { Product } from "../constants"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{ position: "relative", height: "200px", width: "100%" }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <Link
          href={`/products/${product.id}`}
          style={{
            color: "#161616",
            textDecoration: "none",
            marginBottom: "0.5rem",
          }}
        >
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            {product.name}
          </h3>
        </Link>

        <p
          style={{
            color: "#4b5563",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            flex: 1,
          }}
        >
          {product.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex" }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-[#f59e0b]"
                    : i < product.rating
                    ? "text-[#fbbf24]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginLeft: "0.25rem" }}>
            ({product.rating})
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#161616" }}>
            ${product.price.toFixed(2)}
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
              borderRadius: "9999px",
              ...(product.stock > 0
                ? { backgroundColor: "#dcfce7", color: "#166534" }
                : { backgroundColor: "#fee2e2", color: "#991b1b" }),
            }}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>
      </div>
    </div>
  )
}
