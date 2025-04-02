-- Up Migration
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  stock INT NOT NULL,
  image_url TEXT NOT NULL,
  rating DECIMAL(2, 1) NOT NULL CHECK (
    rating >= 1
    AND rating <= 5
  )
);

-- Down Migration
DROP TABLE IF EXISTS products;