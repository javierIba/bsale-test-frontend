function showLoadSpinner() {
    $('#productList').html(`
    <div class="d-flex justify-content-center">
       <div class="spinner-border" role="status">
       </div>
   </div>`);
}

export { showLoadSpinner }