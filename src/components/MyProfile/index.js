import {Component} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import Cookies from 'js-cookie'
import LoadingLoader from '../LoadingLoader'
import Header from '../Header'
import SearchContext from '../../context/SearchContext'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    profileObj: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const profileObj = fetchedData.profile
      const updatedProfileObj = {
        followersCount: profileObj.followers_count,
        followingCount: profileObj.following_count,
        id: profileObj.id,
        posts: profileObj.posts.map(eachItem => ({
          id: eachItem.id,
          image: eachItem.image,
        })),
        postsCount: profileObj.posts_count,
        profilePic: profileObj.profile_pic,
        stories: profileObj.stories.map(eachObj => ({
          id: eachObj.id,
          image: eachObj.image,
        })),
        userBio: profileObj.user_bio,
        userId: profileObj.user_id,
        userName: profileObj.user_name,
      }
      this.setState({
        profileObj: updatedProfileObj,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {profileObj, apiStatus} = this.state
    const {
      followersCount,
      followingCount,
      id,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      userId,
      userName,
    } = profileObj

    const renderNoPostView = () => (
      <div className="no-post-view-container">
        <div className="camera-container">
          <img
            src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1696857693/local_see_z4bshe.jpg"
            alt="no post"
          />
        </div>
        <h1 className="no-posts-yet-heading">No Posts Yet</h1>
      </div>
    )

    const renderUserNameInSmallDevices = () => (
      <p className="profile-username-in-sm">{userName}</p>
    )

    const renderUsernameInLargeDevices = () => (
      <p className="profile-username-in-lg">{userName}</p>
    )

    const renderProfileCaptionUsername = () => (
      <p className="profile-caption-username">{userName}</p>
    )

    const renderProfileCaption = () => (
      <p className="profile-caption">{userBio}</p>
    )

    const renderProfileCaptionInLargeDevices = () => (
      <div className="profile-caption-container-in-lg">
        {renderProfileCaptionUsername()}
        {renderProfileCaption()}
      </div>
    )

    const renderProfileCaptionInSmallDevices = () => (
      <div className="profile-caption-container-in-sm">
        {renderProfileCaptionUsername()}
        {renderProfileCaption()}
      </div>
    )

    const renderPostFollowerFollowingCountDetailsContainer = () => (
      <ul className="post-followers-following-items-container">
        {renderUsernameInLargeDevices()}
        <div className="profile-items-container">
          <li className="each-status-item">
            <p className="status-count">{postsCount}</p>
            <p className="status-name">posts</p>
          </li>
          <li className="each-status-item">
            <p className="status-count">{followersCount}</p>
            <p className="status-name">followers</p>
          </li>
          <li className="each-status-item">
            <p className="status-count">{followingCount}</p>
            <p className="status-name">following</p>
          </li>
        </div>
        {renderProfileCaptionInLargeDevices()}
      </ul>
    )

    const renderProfileFirstContainerInSmDevices = () => (
      <div className="profile-first-container">
        <img className="profile-image" alt="my profile" src={profilePic} />
        {renderPostFollowerFollowingCountDetailsContainer()}
      </div>
    )

    const getProfileStoresItem = eachItem => (
      <li key={eachItem.id} className="profile-story-item">
        <img
          src={eachItem.image}
          alt="my story"
          className="profile-story-img"
        />
      </li>
    )

    const renderProfileStories = () => (
      <ul className="profile-stories-container">
        {stories.map(eachItem => getProfileStoresItem(eachItem))}
      </ul>
    )

    const getProfilePostItem = eachItem => (
      <li key={eachItem.id} className="profile-post-item">
        <img
          src={eachItem.image}
          alt="my post"
          className="profile-post-image"
        />
      </li>
    )

    const renderPostParaAndGridIconContainer = () => (
      <li className="profile-grid-icon-container">
        <BsGrid3X3 fontSize={30} />
        <p className="grid-posts-para">Posts</p>
      </li>
    )

    const renderPostOrNoPostView = () => {
      if (posts.length > 0) {
        return (
          <ul className="profile-post-un-order-container">
            {posts.map(eachItem => getProfilePostItem(eachItem))}
          </ul>
        )
      }
      return renderNoPostView()
    }

    const renderProfilePosts = () => (
      <div className="profile-posts-container">
        {renderPostParaAndGridIconContainer()}
        {renderPostOrNoPostView()}
      </div>
    )

    const renderProfileBodyContainer = () => (
      <div className="profile-body-container">
        {renderUserNameInSmallDevices()}
        {renderProfileFirstContainerInSmDevices()}
        {renderProfileCaptionInSmallDevices()}
        {renderProfileStories()}
        {renderProfilePosts()}
      </div>
    )

    const renderProfileAppropriateView = () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return renderProfileBodyContainer()
        case apiStatusConstants.inProgress:
          return <LoadingLoader />
        default:
          return <SomethingWentWrong madeRequest={this.getProfileData} />
      }
    }

    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput} = value

          return (
            <div className="profile-main-container">
              <Header />
              {searchInput === '' && renderProfileAppropriateView()}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default MyProfile
