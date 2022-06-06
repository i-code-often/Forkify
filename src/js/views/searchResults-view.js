import View from './view.js';
import icons from '../../img/icons.svg';

class SearchResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'We could not fetch any recipe from our database SRY.';
    _message = '';

    _generateMarkup(){
        console.log(this._data);
        return this._data.map(function(recipe){
            return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${recipe.id}">
                  <figure class="preview__fig">
                    <img src="${recipe.image}" alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                    <div class="preview__user-generated">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`;
        }).join('');
    }
}

export default new SearchResultsView();