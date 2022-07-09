

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/api/category/showAllCategories",
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            let categories = json.data;

            $('#categoryList').html(() => {
                return categories.reduce((acc, cur) => {
                    let category = `
                    <li class="list-group-item d-flex justify-content-between align-items-start" name="${cur.id}">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold" >
                            ${cur.name}
                            </div>
                        </div>
                    </li>`
                    return acc.concat(category);
                }, '');
            });
        }
    });
    $.ajax({
        url: "http://localhost:8080/api/filter/showAll",
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            let products = json.data;
            
            $('#productList').html(() => {
                return products.reduce((acc, cur) => {
                    let productName = cur.name;
                    let productPrice = cur.price;
                    let productImage = (cur.url_image && cur.url_image !== "") ? cur.url_image : './images/noDisponible.png';
                    let productCard = `
                    <div class="col-3">
                       <div class="card" style="width: 18rem;">
                            <img src="${productImage}" class="card-img-top" alt="imagen ${productName}">
                            <div class="card-body">
                                <h5 class="card-title">${productName}</h5>
                                <p class="card-text">${productPrice}</p>
                            </div>
                        </div>
                    </div>`
                    return acc.concat(productCard);
                }, '');
            });
        }
    });

});
$(document).ready(function () {
    $('body #categoryList').on('click', 'li', function () {
       
    })
})