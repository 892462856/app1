var constant = { 
    searchClass : 'search-on'
}

function switchSearch() {
    var $body = $(document.body);
    if($body.hasClass(constant.searchClass)){
        $body.removeClass(constant.searchClass);
    }else{
        $body.addClass(constant.searchClass);
    }
}