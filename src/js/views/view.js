import icons from '../../img/icons.svg';
export default class View {
    _data;

    render(data){
        if(Array.isArray(data) && data.length===0){
          return this.renderError();
        }
        this._data = data;
        const html = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
        const markup = `<div class="spinner">
          <div class="spinnn"></div>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(){
      this._clear();

        const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>`;
    
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

    
}