import { Fragment } from "react";

import { Outlet, Link } from "react-router-dom"

import { ReactComponent as ShoppingLogo } from '../../assests/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <ShoppingLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    <Link className="nav-link" to='/auth'>
                        Login
                    </Link>
                </div>
                <h1></h1>
            </div>
            <Outlet />
        </Fragment>
    )

}



export default Navigation; 