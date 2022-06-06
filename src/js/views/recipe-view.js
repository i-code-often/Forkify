import View from './view.js';
import icons from '../../img/icons.svg';

class RecipeView extends View{
  _parentElement;
  _data;
  _errorMessage = 'We could not find that recipe. Please try another one. ;)';

  constructor(){
    super();
    this._parentElement = document.querySelector('.recipe');
    console.log(this._parentElement);
  }
  render(data) {
    super.render(data);

    let img = document.querySelector(`img[src="${data.image_url}"]`);
    img.style.transition = 'all 0.5s ease-in-out';
    img.style.opacity = 0.7;
    img.addEventListener('load', function () {
      this.style.opacity = 1;
    });
  }

  // renderSpinner(){
  //   const markup = `<div class="spinner">
  //     <div class="spinnn"></div>
  //   </div>`;
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  _generateMarkup() {
    let recipe = this._data;
    const html = `
  <figure class="recipe__fig">
    <img src="${recipe.image_url}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-update-to="${this._data.servings-1}" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-update-to="${this._data.servings+1}" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map(ing => {
          return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ?? ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
        })
        .join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.source_url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    return html;
  }
  addHandlerRender(func){
    ['hashchange', 'load'].forEach(ele=>window.addEventListener(ele, func));
  }

  addHandlerServings(func){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--tiny');
      // console.log(btn + '😈😈');

      if(!btn || +btn.dataset.updateTo < 1) return;

      func(+btn.dataset.updateTo);
    });
  }

  addHandlerBookmark(handlerBookmark){
    this._parentElement.addEventListener('click', function(event){
      const btn = event.target.closest('.btn--round');
      if(!btn) return;

      handlerBookmark();
    });
  }

}

export default new RecipeView();
