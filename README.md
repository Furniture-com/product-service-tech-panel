# Assessement
0. Clone the existing repo on your local machine
# API
1. Run the development server by following the instructions in the README file
2. Create a REST endpoint to fetch all products from the `products` table.
3. Create a REST endpoint to fetch a product by id
4. Now that the list of products grow we’d like to make product fetching more efficient. Add pagination to the REST endpoint in #3 using limit and offset query params
5. Implement sorting by price with `asc` being the default sort direction while making sure this will work with pagination (pagination combined with sorting)
6. Add support for a category query param to fetch products within a category.
7. Create a docker image of the existing API that can be pushed to AWS ECR
8. Run a container locally based on the current image and make sure it’s running correctly
9.  If we’d like to secure our product service API, what are the different options and measures that we should take into consideration (No implementation required)

# Frontend
1. Run the development server by following the instructions in the README file
2. Integrate the product service with the product listing page (`ProductListingPage` and `Pagination` components)
3. Implement sorting by price using `ProductSort` component
4. Integrate the product details with the API by completing the code in `ProductDetailsPage` component
5. Now that the number of products per page increases how can we make sure performance and SEO Lighthouse metrics are badly impacted? (No implementation required)