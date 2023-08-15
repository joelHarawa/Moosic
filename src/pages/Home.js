import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import styled, {keyframes} from "styled-components";
import SearchMood from "../components/SearchMood";

import {AuthContext} from "../myContext/myAuthContext";

const AnimationName = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  height: 92vh;
  width: 100%;
  background: linear-gradient(234deg, #a239ca, #0e0b16);
  background-size: 400% 400%;
  animation: ${AnimationName} 15s ease infinite;
`;



const Center = styled.div`
  padding-top: 10%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ContentBox = styled.div`
    background-color: #0E0B16;
    padding: 1%;
    width:60%;
`;

const Greeting = styled.h1`
    color: #4717F6;
`;


const Home = () => {
    const token = window.localStorage.getItem("token");
    const [username, setUsername] = useState("Guest");


    useEffect(() => {
        if (token) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUsername(data.display_name);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                })
        }
    }, [token]);

    return (
        <div>
        <Navbar/>
        <Container>
            <Center>
                <ContentBox>
                    {}
                    <Greeting>Hi, {username}</Greeting>
                    <Greeting>How are you feeling right now?</Greeting>
                    <SearchMood/>
                </ContentBox>

            </Center>

        </Container>
        </div>
    );
}

export default Home;