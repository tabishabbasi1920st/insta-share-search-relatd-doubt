/* eslint-disable */
// Importing the all necessary third-party package or build module.
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'
import SearchInitialView from '../SearchInitialView'
import NoSearchResultView from '../NoSearchResultView'
import Post from '../Post'
import LoadingLoader from '../LoadingLoader'

import './index.css'

// This is the list of Hamburger menu options which will appear only in small devices.
const HamburgerMenuOptionsList = [
  {
    id: 'HOME',
    optionName: 'Home',
  },
  {
    id: 'SEARCH',
    optionName: 'Search',
  },
  {
    id: 'PROFILE',
    optionName: 'Profile',
  },
]

// This is the list of large navbar options which will appear only in large devices.
const lgNavbarOptionsList = [
  {
    id: 'HOME',
    optionName: 'Home',
  },
  {
    id: 'PROFILE',
    optionName: 'Profile',
  },
]

// This is the object which consist API status constants.
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Header extends Component {
  state = {
    showHamMenu: false,
    isSearchTabSelected: false,
    searchApiStatus: apiStatusConstants.initial,
    searchedDataList: [],
  }

  render() {
    return (
      // Search context
      <SearchContext.Consumer>
        {value => {
          const {searchInput, onChangeSearchInput, onResetSearchInput} = value // search context value.

          const {
            isSearchTabSelected,
            searchedDataList,
            searchApiStatus,
            showHamMenu,
          } = this.state // state object's values.

          //  // console.log(
          //   '***************************************************************',
          // )
          // console.log(`showHamMenu: ${showHamMenu}`)
          // console.log(`isSearchTabSelected: ${isSearchTabSelected}`)
          // console.log(`searchedDataList: ${searchedDataList}`)
          //  console.log(`searchApiStatus: ${searchApiStatus}`)
          // console.log(`searchInput: ${searchInput}`)
          // console.log(
          //   '###############################################################',
          //  )

          const getCurrentRoute = () => {
            const {location} = this.props
            const {pathname} = location
            return pathname
          }

          // This function is used to fetch the user searched data.
          const getSearchedData = async () => {
            this.setState({searchApiStatus: apiStatusConstants.inProgress})
            const jwtToken = Cookies.get('jwt_token')
            const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
            const options = {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }

            const response = await fetch(apiUrl, options)
            if (response.ok) {
              const fetchedData = await response.json()
              const searchedPosts = fetchedData.posts
              const updatedSearchedPosts = searchedPosts.map(eachObj => ({
                comments: eachObj.comments.map(eachItem => ({
                  comment: eachItem.comment,
                  userId: eachItem.user_id,
                  userName: eachItem.user_name,
                })),
                createdAt: eachObj.created_at,
                likesCount: eachObj.likes_count,
                postDetails: {
                  caption: eachObj.post_details.caption,
                  imageUrl: eachObj.post_details.image_url,
                },
                postId: eachObj.post_id,
                profilePic: eachObj.profile_pic,
                userId: eachObj.user_id,
                userName: eachObj.user_name,
              }))
              this.setState({
                searchedDataList: updatedSearchedPosts,
                searchApiStatus: apiStatusConstants.success,
              })
            } else {
              this.setState({searchApiStatus: apiStatusConstants.failure})
            }
          }

          const searchedFailureView = () => {
            const onClickTryAgainButton = () => {
              getSearchedData()
            }

            const renderTryAgainButton = () => (
              <button
                type="button"
                className="try-again-button"
                onClick={onClickTryAgainButton}
              >
                Try again
              </button>
            )

            return (
              <div className="went-wrong-main-container">
                <div className="went-wrong-body-container">
                  <img
                    src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1697013860/Group_7737_aebkia.png"
                    alt="something went wrong"
                  />
                  <h1 className="something-went-wrong-heading">
                    Something went wrong. Please try again
                  </h1>
                  {renderTryAgainButton()}
                </div>
              </div>
            )
          }

          // This function handles the event of search (lens) icons in search bar.
          const onClickLensButton = () => {
            getSearchedData()
          }

          // This function handles the event of close button which is in hamburger menu option to close the hamburger menu.
          const onClickCloseButton = () => {
            this.setState({showHamMenu: false})
          }

          // This function is used to logout the user.
          const onClickLogoutButton = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }

          // This function is used to control the state for render the options container of hamburger menu.
          const onClickHamburgerMenuIcon = () => {
            this.setState({showHamMenu: true})
          }

          // This function is used to get close button.
          const getCloseButton = () => (
            <button
              type="button"
              className="close-btn"
              onClick={onClickCloseButton}
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          )

          // This function is used to get logout button.
          const getLogoutButton = () => (
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogoutButton}
            >
              Logout
            </button>
          )

          // This function is used to build the items of nav bar whether it is in small devices or large devices no matter.
          const getMenuOptionItems = eachOption => {
            const {id, optionName} = eachOption

            const getLinkRoute = RouteName => {
              const linkRoutes = {
                home: '/',
                profile: '/my-profile',
              }

              switch (RouteName) {
                case 'Home':
                  return linkRoutes.home

                case 'Search':
                  return getCurrentRoute()

                default:
                  return linkRoutes.profile
              }
            }

            const getOptionByRouteName = () => {
              switch (getCurrentRoute()) {
                case '/':
                  return 'Home'
                case '/my-profile':
                  return 'Profile'
                default:
                  return getCurrentRoute()
              }
            }

            const getSelectedOption = () => {
              if (
                getOptionByRouteName() === 'Home' &&
                isSearchTabSelected === false
              ) {
                return 'Home'
              }
              if (
                getOptionByRouteName() === 'Profile' &&
                isSearchTabSelected === false
              ) {
                return 'Profile'
              }
              if (
                getOptionByRouteName() === 'Home' &&
                isSearchTabSelected === true
              ) {
                return 'Search'
              }
              if (
                getOptionByRouteName() === 'Profile' &&
                isSearchTabSelected === true
              ) {
                return 'Search'
              }
              return ''
            }

            const onClickMenuOptionButton = () => {
              switch (optionName) {
                case HamburgerMenuOptionsList[1].optionName: // Search
                  this.setState(prevState => ({
                    isSearchTabSelected: !prevState.isSearchTabSelected,
                  }))
                  break
                case HamburgerMenuOptionsList[0].optionName: // Home
                  this.setState({
                    isSearchTabSelected: false,
                  })
                  break
                default:
                  // Profile
                  this.setState({
                    isSearchTabSelected: false,
                  })
              }
            }

            const selectedTabClass =
              getSelectedOption() === optionName ? 'selected-option-class' : ''

            return (
              <li key={id} className="ham-option-item">
                <Link to={getLinkRoute(optionName)}>
                  <button
                    type="button"
                    className={`ham-option-item-btn ${selectedTabClass}`}
                    onClick={onClickMenuOptionButton}
                  >
                    {optionName}
                  </button>
                </Link>
              </li>
            )
          }

          // This function is used to render the container in small devices only which consist all the options of hamburger menu .
          const renderHamburgerMenuOptionsContainer = () => {
            const hideOrVisibleClass = showHamMenu ? '' : 'd-none'
            return (
              <ul className={`ham-option-container ${hideOrVisibleClass} `}>
                {HamburgerMenuOptionsList.map(eachOption =>
                  getMenuOptionItems(eachOption),
                )}
                {getLogoutButton()}
                {getCloseButton()}
              </ul>
            )
          }

          // This function returns the hamburger menu button.
          const getHamburgerMenuButton = () => (
            <button
              type="button"
              className="hamburger-menu-btn"
              onClick={onClickHamburgerMenuIcon}
            >
              <GiHamburgerMenu className="hamburger-menu-icon" />
            </button>
          )

          // This function returns the website logo which is placed in header of the website.
          const getHeaderImage = () => (
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1696670758/Standard_Collection_8_qji98b.png"
                alt="website logo"
                className="nav-img"
                onClick={() => {
                  this.setState({
                    isSearchTabSelected: false,
                  })
                  onResetSearchInput()
                }}
              />
            </Link>
          )

          // This function returns the header heading.
          const getInstaShareHeading = () => (
            <h1 className="insta-share-heading">Insta Share</h1>
          )

          // This function is used to render the container which consist all the options of large navbar in large devices only.
          const renderLgNavOptionsContainer = () => (
            <ul className="nav-lg-options-container">
              {lgNavbarOptionsList.map(eachOption =>
                getMenuOptionItems(eachOption),
              )}
              {getLogoutButton()}
            </ul>
          )

          // This function is used to render the search bar in large devices only.
          const renderLgSearchBar = () => (
            <div className="search-bar-container-lg">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                value={searchInput}
                onChange={event => {
                  // handling the different search view.
                  if (searchInput === '') {
                    this.setState({searchApiStatus: apiStatusConstants.initial})
                  }
                  onChangeSearchInput(event)
                }}
              />
              <button
                type="button"
                className="search-btn"
                onClick={() => {
                  getSearchedData()
                  onClickLensButton
                }}
              >
                <FaSearch className="search-icon" testid="searchIcon" />
              </button>
            </div>
          )

          // This function is used to render the Search bar in small devices only.
          const renderSmSearchBar = () => (
            <div className="search-bar-container-sm">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                value={searchInput}
                onChange={event => {
                  // handling the different search views.
                  if (searchInput === '') {
                    this.setState({searchApiStatus: apiStatusConstants.initial})
                  }
                  //   this condition is for hide the ham menu while searchInput !== ""
                  //   if (searchInput !== '') {
                  //     this.setState({showHamMenu: false})
                  //   }
                  onChangeSearchInput(event)
                }}
              />
              <button
                type="button"
                className="search-btn"
                onClick={(onClickLensButton, getSearchedData())}
                testid="searchIcon"
              >
                <FaSearch className="search-icon" testid="searchIcon" />
              </button>
            </div>
          )

          // This function return the appropriate search views.
          const renderSearchRelatedData = () => {
            if (
              searchInput !== '' &&
              searchApiStatus === apiStatusConstants.initial
            ) {
              return <SearchInitialView />
            }
            if (searchApiStatus === apiStatusConstants.inProgress) {
              return <LoadingLoader />
            }
            if (
              searchApiStatus === apiStatusConstants.success &&
              searchedDataList.length === 0
            ) {
              return <NoSearchResultView />
            }
            return (
              <ul className="searched-result-un-order-container">
                {searchedDataList.map(eachObj => (
                  <Post eachObj={eachObj} key={eachObj.postId} />
                ))}
              </ul>
            )
          }

          return (
            <header
              className={`header ${searchInput !== '' ? 'viewport-100' : ''}`}
            >
              <nav className="nav">
                <div className="nav-first-container">
                  {getHeaderImage()}
                  {getInstaShareHeading()}
                </div>
                <div className="nav-second-container">
                  {getHamburgerMenuButton()}
                </div>
                <div className="nav-third-container">
                  {renderLgSearchBar()}
                  {renderLgNavOptionsContainer()}
                </div>
              </nav>
              {renderHamburgerMenuOptionsContainer()}
              {isSearchTabSelected && renderSmSearchBar()}
              {searchInput !== '' && (
                <div className="searched-results-container">
                  {renderSearchRelatedData()}
                </div>
              )}
            </header>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
