import icons from '../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import searchView from './views/searchBar-view.js';
import searchResView from './views/searchResults-view.js';
import bookmarksView from './views/bookmarks-view.js';
import paginationView from './views/pagination-view.js';

const recipeContainer = recipeView._parentElement;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  if (!window.location.hash.slice(1)) {
    recipeContainer.innerHTML = '';

    recipeContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
    </div>`
    );

    return;
  }

  const id = window.location.hash.slice(1);
  try {
    /*
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
*/
    recipeView.renderSpinner();

    //Loading recipe...
    await model.loadRecipe(id);
    let {recipe} = model.state;
    console.log(recipe);

    //Rendering recipe...
    recipeView.render(recipe);

  } catch (e) {
    console.error(e + '💕😘😘');
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
    searchResView.renderSpinner();
    model.state.search.currentPage = 1;

    let query = searchView.getQuery();
    if(!query) return;

    // const searchBar = searchView._parentElement;

    await model.loadSearchResults(query);

    searchResView.render(model.getResultsForPage());

    paginationView.render(model.state.search);

  } catch(err){
    console.log(err);
  }
}

const controlPagination = function(btnEle){
  console.log('PAGINATION BOKTE');
  model.state.search.currentPage = +btnEle.dataset.goToPage;
  searchResView.render(model.getResultsForPage());
  paginationView.render(model.state.search);

};

const controlServings = function(newServings){
  model.updateServings(newServings);

  recipeView.render(model.state.recipe);
}

const controlBookmark = function(){

  model.addBookmark(model.state.recipe);
  recipeView.render(model.state.recipe);

  console.log(model.state.bookmarks);

  bookmarksView.render(model.state.bookmarks);
}


//subscriber-publisher
const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  model.getBookmarks();
  bookmarksView.render(model.state.bookmarks);
}

init();