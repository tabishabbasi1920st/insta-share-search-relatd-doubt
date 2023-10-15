/* eslint-disable */
import Loader from 'react-loader-spinner'
import './index.css'

const LoadingLoader = () => (
  <div className="loading-bg-container" testid="loader">
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  </div>
)

export default LoadingLoader
