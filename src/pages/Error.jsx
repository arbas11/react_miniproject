import { Link } from "react-router-dom";

function Errorpage() {
    return (
        <div className="error-container">
            <h1>No found path turn around!</h1>
            <Link to="/catalog">Back to catalog</Link>
        </div>
    )
}

export default Errorpage;