// Node.js path module - helps with directory/file paths
const path = require('path');
// Plugin to generate HTML file and inject bundles automatically
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point (main file) for application bundling
  entry: './src/index.js',
  output: {
    // Output directory (absolute path) for all bundled files
    path: path.resolve(__dirname, 'dist'),
    // Output filename for bundled JavaScript
    filename: 'bundle.js',
    publicPath: '' // use '' for GitHub Pages unless deploying to a subdirectory
  },
  module: {
    rules: [
      {
        // Rule to process .js and .jsx files
        test: /\.(js|jsx)$/,
        // Exclude node_modules since they are already built
        exclude: /node_modules/,
        // Use babel-loader for transpiling ES6/JSX to ES5 JS
        use: 'babel-loader',
      },
      {
        // Rule to process .css files
        test: /\.css$/,
        // Use style-loader and css-loader for CSS imports in JS
        use: ['style-loader', 'css-loader'],
      },
      {
        // Rule to process .scss and .sass files
        test: /\.s[ac]ss$/i,
        // Use sass-loader (compiles SCSS to CSS), css-loader, then style-loader
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    // File extensions that can be left off in import statements
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // Generates HTML file using template and injects JS/CSS bundles
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // Serves static files from public directory (for assets like images)
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: false, // Don’t show file listings in browser
    },
    historyApiFallback: true, // Always serve index.html for SPAs (React Router)
    port: 3000, // Dev server port (http://localhost:3000)
    open: true, // Automatically open browser on start
    hot: true, // Enable Hot Module Replacement (live reloading changes)
  },
  mode: 'development', // Development mode (for better debugging, not optimized)
};
