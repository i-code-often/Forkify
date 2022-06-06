class SearchView {
    _parentElement = document.querySelector('.search');

    getQuery(){
        return this._parentElement.querySelector('.search__field').value;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', (e)=>{
            e.preventDefault();
            handler();
            this._clearSearch();
        });
    }

    _clearSearch(){
        this._parentElement.querySelector('.search__field').value = '';
    }
}

function bruh(ev){
    ev.preventDefault();
    console.log("BURHURHURHHRUHR");
}

export default new SearchView();