import {Redirect, Route} from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {

    if(isAuthenticated) {
        return (
            <Route
                {...rest}
            />
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/auth/login'
                }}
            />
        );
    }
}
export default PrivateRoute