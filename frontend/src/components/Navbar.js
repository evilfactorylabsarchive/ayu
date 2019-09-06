import React from 'react'
import styled from 'styled-components'

import { Link } from '@reach/router'

const Navbar = styled.div`
  background-color: #333;
  width: 100%;
  font-weight: bold;
  padding: 5px 10px;
  color: #fff;

  :before,
  :after {
    display: table;
    content: '';
    clear: both;
  }
`

const NavbarLeft = styled.div`
  float: left;
  width: 20%;
`

const NavbarRight = styled.div`
  float: left;
  font-weight: normal;
  text-align: right;
  width: 80%;
`

export default () => (
  <Navbar>
    <NavbarLeft>
      <Link to='/'>tinkering</Link>
    </NavbarLeft>
    <NavbarRight>
      <Link to='/tentang'>tentang</Link>
    </NavbarRight>
  </Navbar>
)
