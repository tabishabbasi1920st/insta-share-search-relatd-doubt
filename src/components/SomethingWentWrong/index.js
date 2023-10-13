import {Component} from 'react'
import './index.css'

class SomethingWentWrong extends Component {
  render() {
    const {madeRequest} = this.props

    const onClickTryAgainButton = () => {
      madeRequest()
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
}

export default SomethingWentWrong
