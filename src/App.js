import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import SearchContext from './context/SearchContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'

import './App.css'

class App extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onResetSearchInput = () => {
    this.setState({searchInput: ''})
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          onResetSearchInput: this.onResetSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <PageNotFound />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
