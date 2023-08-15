import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {AuthContext} from "../myContext/myAuthContext";

const Container = styled.div`
    height:8vh;
    background-color: #0E0B16;
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    color: #A239CA;
    text-decoration: none;
    &:hover {
      color: #A239CA;
    }
`;

const MenuItem = styled(Link)`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
    color: #A239CA;
    &:hover {
      color: white;
    }
`;


const Navbar = () => {

    const {login, logout} = useContext(AuthContext);

    const token = window.localStorage.getItem("token");

    return(
    <Container>
        <Wrapper>
            <Left></Left>
            <Center>
                <Logo>Moosic</Logo>
            </Center>
            <Right>{!token ?
                <MenuItem onClick={login}>Login</MenuItem>
                :
                <MenuItem onClick={logout}>Logout</MenuItem>
            }
            </Right>
        </Wrapper>
    </Container>
    )
}

export default Navbar;