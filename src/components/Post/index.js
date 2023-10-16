/* eslint-disable */
import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Post extends Component {
  state = {
    isPostLike: false,
    likeIncrement: 0,
  }

  getComments = eachItem => {
    const {comment, userId, userName} = eachItem
    return (
      <li key={userId} className="each-comment-item">
        <p className="comment-username">
          {userName}
          <span className="post-comment"> {comment}</span>
        </p>
      </li>
    )
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, onResetSearchInput} = value

          const {isPostLike, likeIncrement} = this.state
          const {eachObj} = this.props
          const {
            comments,
            createdAt,
            likesCount,
            postDetails,
            postId,
            profilePic,
            userId,
            userName,
          } = eachObj

          const {caption, imageUrl} = postDetails

<<<<<<< HEAD
=======
          const reloadPage = () => {
            const uniqueKey = setInterval(() => {
              window.location.reload()
              clearInterval(uniqueKey)
            }, 0.1)
          }

>>>>>>> d4280020625cb47ad5d3fafed5b0a5df4da6d764
          const renderDpAndUsernameContainer = () => (
            <div className="post-username-and-dp-container">
              <Link to={`/users/${userId}`}>
                <img
                  src={profilePic}
                  alt="post author profile"
                  className="home-user-profile-pic"
<<<<<<< HEAD
                />
              </Link>
              <Link to={`/users/${userId}`}>
                <p className="home-user-post-username">{userName}</p>
=======
                  onMouseUp={reloadPage}
                />
              </Link>
              <Link to={`/users/${userId}`}>
                <p className="home-user-post-username" onMouseUp={reloadPage}>
                  {userName}
                </p>
>>>>>>> d4280020625cb47ad5d3fafed5b0a5df4da6d764
              </Link>
            </div>
          )

          const renderUserPostImage = () => (
            <img src={imageUrl} alt="post" className="home-user-post-img" />
          )

          const postLikeRequest = async likedStatus => {
            let updatedLikeStatus = {}

            if (likedStatus === true) {
              updatedLikeStatus = {like_status: true}
            } else {
              updatedLikeStatus = {like_status: false}
            }

            const postApiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

            const jwtToken = Cookies.get('jwt_token')

            const options = {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify(updatedLikeStatus),
            }

            const response = await fetch(postApiUrl, options)
            const fetchedData = await response.json()
            const receivedMsg = fetchedData.message
            console.log(receivedMsg)
          }

          const renderResponseButtonsContainer = () => (
            <div className="home-post-details-container">
              {isPostLike ? (
                <button
                  type="button"
                  className="response-buttons"
                  onClick={() => {
                    postLikeRequest(false)
                    this.setState({isPostLike: false})
                    this.setState(prevState => ({
                      likeIncrement: prevState.likeIncrement - 1,
                    }))
                  }}
                  testid="likeIcon"
                >
                  <FcLike fontSize={30} />
                </button>
              ) : (
                <button
                  type="button"
                  className="response-buttons"
                  onClick={() => {
                    postLikeRequest(true)
                    this.setState({isPostLike: true})
                    this.setState(prevState => ({
                      likeIncrement: prevState.likeIncrement + 1,
                    }))
                  }}
                  testid="unLikeIcon"
                >
                  <BsHeart fontSize={25} />
                </button>
              )}
              <button type="button" className="response-buttons">
                <FaRegComment fontSize={25} />
              </button>
              <button type="button" className="response-buttons">
                <BiShareAlt fontSize={25} />
              </button>
            </div>
          )

          const renderCommentsContainer = () => (
            <ul className="comments-container">
              {comments.map(eachItem => this.getComments(eachItem))}
            </ul>
          )

          const renderPostExtraInformativeContainer = () => (
            <div className="home-post-likes-caption-comments-container">
              <p className="post-likes-count">{`${
                likesCount + likeIncrement
              } likes`}</p>
              <p className="post-caption">{caption}</p>
              {renderCommentsContainer()}
              <p className="post-created-timing">{createdAt}</p>
            </div>
          )

          return (
            <li className="post-item" testid="postItem">
              {renderDpAndUsernameContainer()}
              {renderUserPostImage()}
              {renderResponseButtonsContainer()}
              {renderPostExtraInformativeContainer()}
            </li>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Post)
