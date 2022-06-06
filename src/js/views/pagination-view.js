import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    _generateMarkup(){
        const numPages = Math.ceil(this._data.results.length / 10);
        console.log(numPages);
        console.log(this._data);
        let html;

        if(this._data.currentPage === 1 && numPages > 1){
            const goToPage = this._data.currentPage+1;
            html = `<button data-go-to-page="${goToPage}" class="btn--inline pagination__btn--next">
            <span>Page ${goToPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        } else if(this._data.currentPage === numPages && numPages>1){
            const goToPage = this._data.currentPage-1;
            html = `<button data-go-to-page="${goToPage}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${goToPage}</span>
          </button>`;
        }
        else {
            const goToPage = this._data.currentPage;
            html = `<button data-go-to-page="${goToPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${goToPage-1}</span>
          </button>
          <button data-go-to-page="${goToPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${goToPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        return html;
    }

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;

            console.log(btn);
            handler(btn);
        });
    }
}

export default new PaginationView();