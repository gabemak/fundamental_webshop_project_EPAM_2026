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
