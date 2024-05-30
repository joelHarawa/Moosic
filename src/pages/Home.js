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
    display: flex;
    flex-direction: column;
    background-color: #0E0B16;
    padding: 1%;
    width:60%;
`;

const MobileContentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0E0B16;
  padding: 1%;
  width:80%;
`;

const Greeting = styled.h1`
    color: #4717F6;
    font-size: 5vh;
`;

const MobileGreeting = styled.h1`
    color: #4717F6;
    font-size: 4vh;
`;

const Home = () => {
    const token = window.localStorage.getItem("token");
    const [username, setUsername] = useState("Guest");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;


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
        } else {
            setUsername("Guest");
        }
    }, [token]);

    return (
        <div>
        <Navbar/>
        <Container>
            <Center>
                {isMobile ? (
                    <MobileContentBox>
                        <MobileGreeting>Hi, {username}</MobileGreeting>
                        <MobileGreeting>How are you feeling right now?</MobileGreeting>
                        <SearchMood/>
                    </MobileContentBox>
                ) : (
                    <ContentBox>
                        <Greeting>Hi, {username}</Greeting>
                        <Greeting>How are you feeling right now?</Greeting>
                        <SearchMood/>
                    </ContentBox>
                )}


            </Center>

        </Container>
        </div>
    );
}

export default Home;