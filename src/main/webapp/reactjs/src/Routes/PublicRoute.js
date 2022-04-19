import {Redirect, Route} from "react-router-dom";

function PublicRoute({ children, isAuthenticated, ...rest }) {

    if(isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: '/packages'
                }}
            />
        );
    } else {
        return (
            <Route
                {...rest}
            />
        );
    }
}
export default PublicRoute