import { Fragment, useContext } from "react";

import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingLogo } from '../../assests/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from '../../utils/firebase/firebase.utils'

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles.jsx'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    // console.log(currentUser)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <ShoppingLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>)
                            : (
                                <NavLink to='/auth'> Sign In
                                </NavLink>
                            )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
                <h1></h1>
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )

}

export default Navigation; 