## FOR REDUX INTEGRATION REPLACE index.js WITH CODE BELOW

```
  import React from "react";
  import ReactDOM from "react-dom";
  import { createStore, applyMiddleware } from "redux";
  import { Provider } from "react-redux";
  import thunk from "redux-thunk";
  import reducers from "./reducers/Reducers";
  import AppWithRouter from "./components/app/App";
  import "./sass/main.scss";

  const store = createStore(reducers, applyMiddleware(thunk));

  ReactDOM.render(
    <Provider store={store}>
      <AppWithRouter />
    </Provider>, 
  document.querySelector("#root"));
```

## FOLDERS STRUCTURE OR REDUX AND REACT

1. src > actions  
  `a. Actions.js - Export all actions`  
  `b. ActionTypes.action.js - Has all action types`

2. src > reducers  
  `a. Reducers.js - Combile all the reducers and export`  

3. src > containers  
  - This folder is not available, to use redux make it.
  - Same folder structure of components but all those components with redux integration should be migrated here.

4. src > helpers  
  `a. Helpers.js - Export all helpers`  
  `b. Api.helper.js - Axios api config with config BASE_URL`  
  `c. Cookie.helper.js - Helpers to create, and delete cookies stored in 'universal-cookie'`  
  `d. ActionSet.helper.js - Create a action set object with LOADING, SUCCESS, ERROR and action.`  

5. src > config  
  `a. Config.js - Exports BASE_URL key`  
  `b. Api.config.js - APIS object with all apis`  