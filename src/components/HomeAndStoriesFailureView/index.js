import './index.css'

const HomeAndStoriesFailureView = props => {
  const {madeRequest} = props

  const onClickTryAgainBtn = () => {
    madeRequest()
  }

  return (
    <div className="failure-view-main-container">
      <img
        src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1697015357/Icon_odrzwc.png"
        alt="failure view"
      />
      <h1 className="failure-view-main-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="failure-view-try-again-btn"
        onClick={onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )
}
export default HomeAndStoriesFailureView
