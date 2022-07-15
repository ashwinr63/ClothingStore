import { Fragment, useContext } from "react";

import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingLogo } from '../../assests/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    // console.log(currentUser)
    const { isCartOpen } = useContext(CartContext)

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
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>Sign Out</span>)
                            : (
                                <Link className="nav-link" to='/auth'> Sign In
                                </Link>
                            )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
                <h1></h1>
            </div>
            <Outlet />
        </Fragment>
    )

}



export default Navigation; 