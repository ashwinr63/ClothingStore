import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { ReactComponent as ShoppingLogo } from '../../assests/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from '../../utils/firebase/firebase.utils'

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
  BrandText,
  SignOutLink,
  MainContent,
} from './navigation.styles.jsx'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <ShoppingLogo className="logo" />
                    <BrandText>CRWN</BrandText>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <>
                                <NavLink to='/orders'>Orders</NavLink>
                                <SignOutLink onClick={signOutUser}>Sign Out</SignOutLink>
                            </>
                        ) : (
                                <NavLink to='/auth'>Sign In</NavLink>
                            )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
                
            </NavigationContainer>
            <MainContent>
              <Outlet />
            </MainContent>
        </Fragment>
    )
}

export default Navigation;
