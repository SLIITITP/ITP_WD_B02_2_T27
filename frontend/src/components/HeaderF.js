import React from 'react'
import styled from 'styled-components'
import banner from '../assets/flightbanner.jpg'
import { NavLink as StyledNavLink } from 'react-router-dom'

const Container = styled.div`
    display: flex;  
    flex-direction: column;
`
const NavBar = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`
const Left = styled.div``
const Logo = styled.h2`
    color: #2A96B8;
    font-weight: 600;
`
const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`
const Menu = styled.div`
    display: flex;
    gap: 30px;
`
const MenuItems = styled.div`
    font-weight: 500;
`
const NavLink = styled(StyledNavLink)`
text-decoration: none;
        color: #919396;
    &.active{
        color: rgb(42, 150, 184);
    }
    :hover{
        color: rgb(42, 150, 184);
    }
`
const ButtonContainer = styled.div`

`
const Button = styled.button`
    border: none;
    padding: 10px 20px;
    background-color: #FFE607;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    :hover{
        background-color: #c0b01c;
    }
`

const Banner = styled.img`
    height: 350px;
    object-fit: cover;
    align-items: center;
    justify-content: center;
    background: url(${banner}) center;
    background-size: cover;

`
const SubNav = styled.div`
    height: 80px;
    background-color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Header = () => {
  return (
    <Container>
        <NavBar>
            <Left>
                <Logo>
                    Serandib Travel
                </Logo>
            </Left>
            <Right>
                <Menu>
                    <MenuItems>
                    <NavLink to={'/about'}>About</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/fa'}>Flights</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/hotels'}>Hotels</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/packages'}>Packages</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/cars'}>Cars</NavLink>
                    </MenuItems>
                </Menu>
                <ButtonContainer>
                    <Button>
                    <NavLink to={'/'}>Log Out</NavLink>
                    </Button>
                </ButtonContainer>
            </Right>
        </NavBar>
        <Banner/>
        <SubNav>
        <Menu>
                    <MenuItems>
                    <NavLink to={'/flight'}>View</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/reservations'}>Reservations</NavLink>
                    </MenuItems>
                    <MenuItems>
                    <NavLink to={'/add-reservation'}>Add Reservation</NavLink>
                    </MenuItems>
                </Menu>
        </SubNav>
    </Container>
  )
}

export default Header