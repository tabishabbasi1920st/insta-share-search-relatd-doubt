import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class PageNotFound extends Component {
  renderHomePageButton = () => (
    <Link to="/">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  )

  render() {
    return (
      <div className="not-found-main-container">
        <img
          src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1697098533/erroring_2_p3xlgb.png"
          alt="page not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-para">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        {this.renderHomePageButton()}
      </div>
    )
  }
}

export default PageNotFound
