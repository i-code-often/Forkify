import {API_KEY} from './config.js';
export const state = {
    search: {
        query: '',
        results: [],
        currentPage: 1, 
    },
    recipe: {},
    bookmarks: [],
}

export const loadRecipe = async function(id){
    try{
    const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${API_KEY}`
      );
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(`${res.statusText}...${data.message} 😁👌👌`);
  
      let { recipe } = data.data;
      state.recipe = recipe;

      if(state.bookmarks.some(bookmark => bookmark.id===id))
        state.recipe.bookmarked = true;
      else
        state.recipe.bookmarked = false;

    } catch(err){
        throw new Error(err);
    }
}

export const loadSearchResults = async function(query){
    try{
        state.search.query = query;
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
        const data = await res.json();
        console.log(data);
        
        state.search.results = data.data.recipes.map(recipe => {
            return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url,
            };
        });

    } catch(err){
        console.log(err + '🤷‍♂️🤷‍♂️🤷‍♂️');
        throw err;
    }
};

export const getResultsForPage = (pageNum = state.search.currentPage)=>{
    let start = (pageNum-1) * 10
    let end = pageNum * 10;

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing=>{
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
}

export const addBookmark = function(recipe){

    if(recipe.id === state.recipe.id && !recipe.bookmarked){
        state.recipe.bookmarked = true;
        state.bookmarks.push(recipe);
        persistBookmarks();
    }
    
    else if(recipe.id === state.recipe.id && recipe.bookmarked){
        state.recipe.bookmarked = false;
        state.bookmarks.splice(state.bookmarks.indexOf(recipe), 1);
         persistBookmarks();   
    }
}

function persistBookmarks(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function getBookmarks(){
    const books = localStorage.getItem('bookmarks');
    if(books) state.bookmarks = JSON.parse(books);
}
