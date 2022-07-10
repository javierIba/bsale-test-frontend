import { showLoadSpinner } from './spinner.js'

const url_server = "http://localhost:8080";
const url_showAllProducts = `${url_server}/api/filter/showAll`;
const url_showProductsByCategory = `${url_server}/api/filter/showProductByCategory`;
const url_showProductBy = `${url_server}/api/filter/searchProductBy`;
const url_imagen_no_disponible = './images/noDisponible.png';
const errorMessage = 'Ha ocurrido un error, por favor intentelo más tarde';

function showProducts() {
    $.ajax({
        url: url_showAllProducts,
        method: 'GET',
        dataType: 'json',
        success: (json) => ajaxPetitionProductSuccess(json),
        error: (json) => ajaxPetitionProductError(json)
    });
}

function ajaxPetitionProductSuccess(json) {
    const products = json.data;
    const messageNotFound = 'No se han encontrado articulos con esas caracteristicas';
    if (Array.isArray(products) && products.length > 0) {
        drawProducts(products);
    } else {
        $('#productList').html(messageNotFound);
    }

}
function ajaxPetitionProductError() {
    $('#productList').html(errorMessage);
}



function drawProducts(products) {
    $('#productList').html(() => {
        return products.reduce((acc, cur) => {
            let productName = cur.name;
            let productPrice = new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(cur.price);
            let productImage = (cur.url_image && cur.url_image !== "") ? cur.url_image : url_imagen_no_disponible;
            let productDiscount = cur.discount;
            let productPriceDiscount = '';
            if (productDiscount) {
                productPriceDiscount = new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(cur.price * ((100 - productDiscount) / 100));
            }
            let productCard = `
            <div class="col-sm-5 col-md-4 col-lg-3  ">
               <div class="card w-100" >
                    <div class="product-image">
                    ${(productDiscount) ? '<div class="discount-float">-' + productDiscount + '%</div>' : ''}
                        <img src="${productImage}" class="card-img-top" alt="imagen ${productName}">
                    </div>
                    <div class="card-body">
                        <div class="card-title">
                            <p >${productName}</p>
                        </div>
                        <div class="card-text">
                            <p ${(productDiscount) ? 'class="discount-text"' : ''}>${productPrice}</p>
                            <p>${productPriceDiscount}</p>
                        </div>
                    </div>
                </div>
            </div>`
            return acc.concat(productCard);
        }, '');
    });
}

function searchProductBy() {

    $("body #buscador").keypress((e) => {
        $("#categoryList li").removeClass("list-group-item-dark");
        let code = (e.keyCode ? e.keyCode : e.which);
        let enterCode = 13;

        if (code === enterCode) {
            let productToSearch = $('body #buscador').val();
            e.preventDefault();

            showLoadSpinner()
            $.ajax({
                url: url_showProductBy,
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({ product: productToSearch }),

                success: (json) => ajaxPetitionProductSuccess(json),
                error: (json) => ajaxPetitionProductError(json)
            });
        }
    });

}

function showProductsByCategory() {
    $('body #categoryList').on('click', 'li', function () {
        let categoryName = $(this).attr('name');
        if (categoryName === 'initialCategory') {
            showProducts();
        } else {
            showLoadSpinner();
            $.ajax({
                url: url_showProductsByCategory,
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    category: categoryName
                }),

                success: (json) => ajaxPetitionProductSuccess(json),
                error: () => ajaxPetitionProductError(json)
            });

        }
        $('#buscador').val('');
        $("#categoryList li").removeClass("list-group-item-dark");
        $(this).addClass("list-group-item-dark");
    });
}
function showSortProducts() {
    $('body #sortBy').on('click', 'a', function () {
        let sortBy = $(this).attr('name');
        let inputSearchValue = $('body #buscador').val();
        let categoryName = $(".list-group-item-dark").attr('name');
        if (categoryName) {
            if (categoryName === 'initialCategory') {
                showLoadSpinner();
                $.ajax({
                    url: url_showAllProducts,
                    method: 'GET',
                    contentType: "application/json",
                    dataType: "json",
                    

                    success: (json) => ajaxPetitionProductSortSuccess(json, sortBy),
                    error: (json) => ajaxPetitionProductError(json)
                });
            } else {
                showLoadSpinner();
                $.ajax({
                    url: url_showProductsByCategory,
                    method: 'POST',
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        category: categoryName
                    }),

                    success: (json) => ajaxPetitionProductSortSuccess(json,sortBy),
                    error: (json) => ajaxPetitionProductError(json)
                });

            }
        }
    })

}
function ajaxPetitionProductSortSuccess(json, sortBy) {
    let data = json.data;
    if (sortBy === 'lPrice') {
        data = data.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'hPrice') {
        data = data.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'lDiscount') {
        data = data.sort((a, b) => a.discount - b.discount);

    } else if (sortBy === 'hDiscount') {
        data = data.sort((a, b) => b.discount - a.discount);

    }
    drawProducts(data);
}

export {
    showProducts,
    searchProductBy,
    showProductsByCategory,
    showSortProducts
}