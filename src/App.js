import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login'
import Profile from './Profile'
import BestBooks from './BestBooks.js'
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  render() {
    console.log('app', this.props);
    console.log(this.props.auth0)
    const {isLoading, isAuthenticated} = this.props.auth0;
    
    if (isLoading) {
      return <h2> Still Loading....</h2>
    }else {
      return (
        <>
          <Router>
            <IsLoadingAndError>
              <Header isAuthenticated={isAuthenticated}/>
              <Switch>
                <Route exact path="/">
                  {/* Done: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */ 
                  isAuthenticated ? <BestBooks /> : <Login /> }
                </Route>
                <Route exact path="/profile" >
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */
                isAuthenticated ? <Profile /> : <h1>Please Login above to see this page</h1>}
                </Route>
              </Switch>
              <Footer />
            </IsLoadingAndError>
          </Router>
        </>
      );
    }
  }
}

export default withAuth0(App);
