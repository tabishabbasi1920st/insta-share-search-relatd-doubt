import './index.css'

const NoSearchResultView = () => (
  <div className="not-found-search-view-container">
    <img
      src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1696865624/Group_t2kyqb.png"
      alt="search not found"
      className="not-found-search-view-image"
    />
    <h1 className="search-not-found-heading">Search Not Found</h1>
    <p className="not-found-search-view-para">
      Try different keyword or search again
    </p>
  </div>
)

export default NoSearchResultView
