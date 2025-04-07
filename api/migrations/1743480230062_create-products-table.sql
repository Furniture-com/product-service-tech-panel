-- Up Migration
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    rating DECIMAL(3, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    details TEXT NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    materials TEXT NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);

-- Down Migration
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_price;
DROP INDEX IF EXISTS idx_products_rating;
DROP TABLE IF EXISTS products;