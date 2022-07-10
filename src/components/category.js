

const url_server = "http://localhost:8080";
const errorMessage = 'Ha ocurrido un error, por favor intentelo más tarde';
const url_showAllCategories = `${url_server}/api/category/showAllCategories`;

function showAllCategories() {
    $.ajax({
        url: url_showAllCategories,
        type: 'GET',
        dataType: 'json',
        success: (json) => ajaxPetitionCategorySuccess(json),
        error: (json) => ajaxPetitionCategoryError(json)
    });
}

function ajaxPetitionCategorySuccess(json) {
    let categories = json.data;
    drawCategories(categories);
}

function ajaxPetitionCategoryError(json) {
    $('#categoryList').html(errorMessage);
}

function drawCategories(categories) {
    let initialCategoryList = `<li class="list-group-item d-flex justify-content-between align-items-start list-group-item-dark" name="initialCategory">
        	                        <div class="ms-2 me-auto">
                                        <div class="fw-bold" >
                                            <p>Todos los productos</p>
                                        </div>
                                    </div>
                                </li>`;

    $('#categoryList').html(() => {
        return categories.reduce((acc, cur) => {
            let name = cur.name[0].toUpperCase() + cur.name.slice(1,cur.name.lenght);
            let category = `
            <li class="list-group-item d-flex justify-content-between align-items-start " name="${cur.id}">
                <div class="ms-2 me-auto">
                    <div class="fw-bold" >
                    ${  name}
                    </div>
                </div>
            </li>`
            return acc.concat(category);
        }, initialCategoryList);
    });
}


export { showAllCategories }