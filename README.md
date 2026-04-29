# Technologies Used:

The project is built with a modern web stack to ensure a modular architecture and a fast development experience:

Vite: The core build tool providing a lightning-fast development server (HMR) and optimized production builds.

TypeScript: Used for type-safe development of the business logic (filtering, sorting, and pagination).

Sass (SCSS): Modular styling using variables, mixins, and nested rules for maintainable CSS.

HTML5 & Components: Semantic structure enhanced with vite-plugin-html-inject for reusable components like Headers and Footers.

JSON-based Data Management: Product data is managed via a local data.json file, simulated as an asynchronous API source.

Figma Design Implementation: High-fidelity UI/UX development based on provided design specifications.

# Project template

Basic steps:

1. Repository cloned from autocode.git.epam.com to local VSCode

2. Run 'npm install' in Terminal to install dependencies from package.json

3. "compile": "sass src/scss:dist/css" line added to scripts in package.json file to handle the compilation of all `.scss` files into `.css` files

4. Install LiveServer extension to be able to open the index.html file in the browser

Updated Development Workflow

5. Integrated Vite for Asset Management
   Installed Vite and vite-plugin-html-inject to enable modular HTML development (e.g., using <load src="..." /> tags for header and footer components).

6. Configuration for HTML Components
   Created a vite.config.js file to configure the HTML injection plugin, allowing the project to reuse HTML partials across different pages.

7. Sass Integration with Vite
   Modified the project to link directly to src/scss/main.scss in the HTML files. This allows Vite to handle Sass compilation automatically in the background with Hot Module Replacement (HMR).

8. Running the Development Server
   Instead of using Live Server, use the following command to start the local development environment: npm run dev
   This provides a local URL (e.g., http://localhost:5173) where changes are reflected instantly upon saving.

9. Building for Production
   To generate the final, optimized version of the project (minified CSS and JS), run:
   npm run build
   The production-ready files will be generated in the dist/ folder.

10. Key Features & Business Logic
    The Catalog page implements the following functional requirements:
    Dynamic Product Listing: Products are loaded asynchronously from a local data.json source.
    Advanced Sorting: Users can arrange items by:
    Price (Lowest to Highest / Highest to Lowest)
    Popularity (Most popular)
    Rating (Highest rated first)
    Search Functionality:
    Conducts searches within local JSON data by product name.
    Redirect: If a match is found, the user is redirected to the Product Details page.
    Validation: If no match is found, a "Product not found" pop-up alert is displayed.
    Asynchronous Pagination:
    Displays exactly 12 products per page.
    Includes "Previous" and "Next" buttons.
    Loads pages dynamically without a full browser reload.
    Displays a dynamic status indicator: "Showing X–Y of Z results".
    Top Best Sets Sidebar: A dedicated sidebar that displays a randomized selection of suitcase sets to the visitors.
    Multi-criteria Filtering: Users can filter suitcases by category, color, and size simultaneously. The results update dynamically without page reloads.
    Search Validation: An error handling mechanism is implemented for the search bar. If no product matches the query, a feedback message is displayed to the user.

11. Design Implementation
    Figma Fidelity: The development strictly follows the Figma design specs regarding card layouts, typography (Montserrat), and the color palette.

Responsive Layout: The Product Grid is fully responsive, featuring a 3-column layout on desktop and a single-column stack on mobile devices.

12. Project Structure
    A brief overview of the key directories:
    /src/ts/: Contains the TypeScript business logic (Sorting, Pagination, Search).
    /src/scss/: Modular Sass files organized by layout, components, and specific pages.
    /src/assets/: Stores images, icons, and the source data.json.
    /public/: Static assets that are served directly.
