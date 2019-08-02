var $pagination = $('#paginacao');
var defaultOptionsPag = {
    initiateStartPageClick: false,
    visiblePages: 3,
    prev: '<img src="./img/Caminho 1054.svg" height="15">',
    nextClass: 'no-border',
    prevClass: 'no-border',
    next: '<img src="./img/Caminho 1053.svg" height="15">',
    last: '<img src="./img/Group First - 1.svg" height="15">',
    lastClass: 'no-border',
    first: '<img src="./img/Group First.svg" height="15">',
    firstClass: 'no-border',
    paginationClass: 'pagination mt-5 justify-content-center',
    changeTotalPages: function (totalPages) {
        this.options.totalPages = totalPages;
        var pages = this.getPages(currentPage);
        $('#page-content').text('Page ' + pages);
    },
};
$pagination.twbsPagination(defaultOptionsPag);