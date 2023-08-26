export default {
  // The base URL when your application is deployed
  // It's usually '/' for the root of the domain, but you can specify a subdirectory if needed
  base: '/',

  // Development server options
  server: {
    // Port to run the development server on
    port: 3000,
  },

  // Build options
  build: {
    // Output directory for the production build
    outDir: 'dist',

    // By default, Vite will create a directory named 'dist' for the production build.
    // You can customize it here.

    // Whether to generate sourcemaps for the production build
    sourcemap: false,
  },
};
