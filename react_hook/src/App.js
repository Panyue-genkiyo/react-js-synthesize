import React, {Component} from 'react';
// import Demo from "./2_lazyLoad";
// import Demo from './Fragment';
// import A from './4_context'
// import Parent  from './5_optimize'
// import Parent from  './6_renderProps'
import Parent from './7_ErrorBoundary/Parent';

class App extends Component {
  render() {
    return (
        <>
          <Parent/>
        </>
    );
  }
}

export default App;
