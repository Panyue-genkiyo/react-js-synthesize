import bookStore from '../components/Book/bookState';
import categoryStore from '../components/Category/categoryState';
import AppStore from '../appState';
import searchStore from '../components/SearchA/searchState'

export const store = {
    root:{
        bookStore,
        categoryStore,
        AppStore,
        searchStore
    }
}
