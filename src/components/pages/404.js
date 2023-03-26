import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div className="page_404" style={{width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <ErrorMessage/>
            <p>Oops, this page is not found</p>
            <Link to="/" style={{color: '#9F0013', textTransform: 'uppercase'}}>Go to Home page</Link>
        </div>
    )
}

export default Page404;