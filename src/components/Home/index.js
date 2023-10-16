import {Component} from 'react'
import Cookies from 'js-cookie'
import SearchContext from '../../context/SearchContext'
import Header from '../Header'
import UserStories from '../UserStories'
import Post from '../Post'
import './index.css'
import LoadingLoader from '../LoadingLoader'
import HomeAndStoriesFailureView from '../HomeAndStoriesFailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    postList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserPostsList()
  }

  getUserPostsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const postsList = fetchedData.posts
      const updatedPostsList = postsList.map(eachObj => ({
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
        postList: updatedPostsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {postList, apiStatus} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput} = value

          const renderUserStories = () => (
            <>
              <UserStories />
            </>
          )

          const renderUsersPosts = () => (
            <ul className="home-posts-container">
              {postList.map(eachObj => (
                <Post key={eachObj.postId} eachObj={eachObj} />
              ))}
            </ul>
          )

          const renderHomeDataPostOrDifferentViews = () => {
            if (apiStatus === apiStatusConstants.success) {
              return renderUsersPosts()
            }
            if (apiStatus === apiStatusConstants.inProgress) {
              return <LoadingLoader />
            }
            return (
              <HomeAndStoriesFailureView madeRequest={this.getUserPostsList} />
            )
          }

          return (
            <div className="home-main-container">
              <Header />
              {searchInput === '' && (
                <div className="home-body-container">
                  {renderUserStories()}
                  {renderHomeDataPostOrDifferentViews()}
                </div>
              )}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Home
