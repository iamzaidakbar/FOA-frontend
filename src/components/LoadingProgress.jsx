import { BarLoader, ClipLoader } from "react-spinners";
import "../styles/LoadingProgress.scss";

const wrapper = ({ children }) => <div className="loading-wrapper">
     <p className="loading-bar">{children}</p>
     <p className="loading-text">Loading...</p>
</div>;

export default function LoadingProgress({ loaderType }) {
  switch (loaderType) {
    case "BarLoader":
      return wrapper({ children: <BarLoader width="160px" color="#000000ff" /> });
    case "ClipLoader":
      return wrapper({ children: <ClipLoader /> });
    default:
      return <BarLoader color="#000000ff" />;
  }
}
