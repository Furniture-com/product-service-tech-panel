"use client"

import Image from "next/image"
import StarIcon from "./StarIcon"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    category: string
    stock: number
    imageUrl: string
    rating: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#161616] mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#161616]">${product.price}</span>
          <span className="text-sm text-gray-500">In Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  )
}
