/**
 * Asynchronously loads the component for AddFaPage
 */

import { lazyLoad } from 'utils/loadable';

// Use the lazyLoad function to load the AddFaPage component asynchronously
// The first parameter is a function that imports the component
// The second parameter is a function that resolves to the component once the module is loaded
export const AddFaPage = lazyLoad(
  () => import('./index'), // Import the module at './index'
  module => module.AddFaPage, // Resolve to the AddFaPage component in the module
);
