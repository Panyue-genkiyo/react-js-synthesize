import React from 'react';
import {Link,Switch,Route,NavLink,Redirect,useHistory} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import './App.css';
import Default from "./components/Default";
import List from "./components/List";

const App = () => {

    let history = useHistory();

    const goAbout = () => {
        history.push({
            pathname:'/about',
            search:'?name=panyue&con=1'
        });
    }


    const goBack = () => {
        history.goBack();
    }

    return (
        <div>
          <p>hello world</p>
          <ul>
              <li><Link to='/home'>home</Link></li>
              <li><NavLink to='/about' activeClassName={'active_about'}>about</NavLink></li>
              <li><NavLink to='/default' activeClassName={'active_default'}>default</NavLink></li>
          </ul>
            <Switch>
                {/*exact意思是指精准匹配*/}
                <Route path='/home' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/list/:id' component={List}/>
                <Route path='/default' component={Default}/>
                <Redirect to='/home'/>
            </Switch>
            <button onClick={goAbout}>
                go about
            </button>
            <button onClick={goBack}>
                go back
            </button>
        </div>
    );
};

export default App;
