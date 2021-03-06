import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { SOLID, TRANSPARENT } from './NavbarTypes';

import NavbarRight from './NavbarRight';
import NavbarLeft from './NavbarLeft';
import PageLoadWidget from './PageLoadWidget';

const NavbarComponent = ({
  clickNavLink,
  location,
  links,
  user,
  type,
  offTop,
  mobileNavOpen,
  pageLoading
}) => {
  const navbarClass = classnames(
    type === SOLID ? 'navbar-solid' : 'navbar-transparent',
    {
      'off-top': offTop === true,
      'fixed': mobileNavOpen
    },
  );

  return (
    <div className={classnames('navbar-container', navbarClass)}>
      <ReactCSSTransitionGroup
        transitionName='page-load-widget'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500} >
        {
          pageLoading && <PageLoadWidget key='1' />
        }
      </ReactCSSTransitionGroup>

      <div className='container'>
        <nav className='navbar'>
          <NavbarLeft
            clickNavLink={clickNavLink}
            links={links}
            location={location}
            type={type} />

          <NavbarRight
            type={type}
            user={user} />
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
