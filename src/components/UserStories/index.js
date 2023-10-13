import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import LoadingLoader from '../LoadingLoader'
import './index.css'
import HomeAndStoriesFailureView from '../HomeAndStoriesFailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    storiesList: [],
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const usersStories = fetchedData.users_stories
      const updatedUsersStories = usersStories.map(eachObj => ({
        storyUrl: eachObj.story_url,
        userId: eachObj.user_id,
        userName: eachObj.user_name,
      }))
      this.setState({
        storiesList: updatedUsersStories,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getStoriesItem = eachObj => {
    const {storyUrl, userId, userName} = eachObj
    return (
      <div key={userId} className="story-item">
        <img src={storyUrl} alt="user story" className="story-img" />
        <p className="story-username">{userName}</p>
      </div>
    )
  }

  renderLoader = () => <LoadingLoader />

  renderSlick = () => {
    const {storiesList} = this.state
    const settings = {
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 240,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {storiesList.map(eachObj => this.getStoriesItem(eachObj))}
      </Slider>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSlick()
      default:
        return <HomeAndStoriesFailureView madeRequest={this.getUserStories} />
    }
  }

  render() {
    return <div className="slick-main-container">{this.renderView()}</div>
  }
}

export default UserStories
