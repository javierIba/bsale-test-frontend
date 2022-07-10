import {showProducts,searchProductBy,showProductsByCategory} from './components/products.js';
import { showAllCategories} from './components/category.js';
import { showLoadSpinner } from './components/spinner.js'



$(document).ready(() => {
    showLoadSpinner();
    showProducts();
    showAllCategories();
});

$(document).ready(() => {
   showProductsByCategory();
   searchProductBy()
})


$(document).ready(function () {
    
});






