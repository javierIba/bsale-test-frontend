import {showProducts,searchProductBy,showProductsByCategory,showSortProducts} from './components/products.js';
import { showAllCategories} from './components/category.js';
import { showLoadSpinner } from './components/spinner.js'



$(document).ready(() => {
    
    showLoadSpinner();
    showProducts();
    showAllCategories();
});

$(document).ready(() => {
   showProductsByCategory();
   
   showSortProducts();
})


$(document).ready(function () {
    console.log{("klsdakñdsa")}
 
});






