import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "mobx-react";
import {store} from './store/index';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import Book from "./components/Book/Detail";
import Category from "./components/Category/Detail";
import Ca from './components/Category'
import AddCategory from "./components/Category/AddCategory";
import EditCategory from "./components/Category/EditCategory";
import AddBook from "./components/Book/AddBook";
import Ba from "./components/Book";
import EditBook from "./components/Book/EditBook";
import SearchA from "./components/SearchA";

ReactDOM.render(
      <Provider {...store}>
          <BrowserRouter>
                 <App root={store.root}>
                     <Switch>
                         <Route  path={'/books'}>
                             <Ba>
                                 <Switch>
                                     <Route path={'/books/ed'} >
                                         <EditBook books={store.root.bookStore} categorys={store.root.categoryStore} app={store.root.AppStore}/>
                                     </Route>
                                     <Route  path={'/'}>
                                         <Book books={store.root.bookStore}  app={store.root.AppStore}/>
                                     </Route>
                                     <Redirect to={'/'}/>
                                 </Switch>
                             </Ba>
                         </Route>
                         <Route path={'/addBook'}>
                              <AddBook books={store.root.bookStore} categorys={store.root.categoryStore} app={store.root.AppStore}/>
                         </Route>
                         <Route path={'/categorys'}>
                             <Ca>
                                 <Switch>
                                     <Route path={'/categorys/ed'}>
                                         <EditCategory categorys={store.root.categoryStore} app={store.root.AppStore}/>
                                     </Route>
                                     <Route path={'/'}>
                                         <Category categorys={store.root.categoryStore} books={store.root.bookStore} app={store.root.AppStore}/>
                                     </Route>
                                     <Redirect to={'/'}/>
                                 </Switch>
                             </Ca>
                         </Route>
                         <Route path={'/addCategory'}>
                             <AddCategory categorys={store.root.categoryStore} app={store.root.AppStore}/>
                         </Route>
                         <Route path={'/searchBooks'}>
                            <SearchA app={store.root.AppStore} books={store.root.bookStore} searchs={store.root.searchStore} categorys={store.root.categoryStore}/>
                         </Route>
                         <Redirect to={'/books'}/>
                     </Switch>
                 </App>
          </BrowserRouter>
      </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
