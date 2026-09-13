import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { ReactComponent as ShoppingLogo } from '../../assests/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from '../../utils/firebase/firebase.utils'

import { NavigationContainer, NavLink, NavLinks, LogoContainer, MobileToggle, NavInner, Main } from './navigation.styles.jsx'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Fragment>
            <NavigationContainer>
                <NavInner>
                    <LogoContainer to='/' aria-label="Clothing Store Home">
                        <ShoppingLogo className="logo" />
                    </LogoContainer>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <MobileToggle aria-label="Toggle navigation menu" onClick={() => setMenuOpen((o) => !o)}>
                            {/* simple hamburger */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </MobileToggle>
                        <CartIcon />
                    </div>
                    <NavLinks data-open={menuOpen}>
                        <NavLink to='/shop' onClick={() => setMenuOpen(false)}>
                            Shop
                        </NavLink>
                        {currentUser ? (
                            <>
                                <NavLink to='/orders' onClick={() => setMenuOpen(false)}>Orders</NavLink>
                                <NavLink to='/profile' onClick={() => setMenuOpen(false)}>Profile</NavLink>
                                <NavLink as='span' onClick={() => { signOutUser(); setMenuOpen(false); }}>Sign Out</NavLink>
                            </>
                        ) : (
                            <NavLink to='/auth' onClick={() => setMenuOpen(false)}> Sign In </NavLink>
                        )}
                    </NavLinks>
                    {isCartOpen && <CartDropdown />}
                </NavInner>
                
            </NavigationContainer>
            <Main>
                <div className="page-container">
                    <Outlet />
                </div>
            </Main>
        </Fragment>
    )
}

export default Navigation;