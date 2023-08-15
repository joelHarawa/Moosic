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
const nothing = 6;
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

const Title = styled.h1`
    color: #4717F6;
`;

const Playlist = styled.ul`
    list-style: none;
    padding-left: 0;
`;
const Song = styled.li`
    color: #A239CA;
    text-decoration: none;
    font-size: 18px;
    padding: 2px;
    margin: 0;
    &:hover {
      color: white;
      cursor: pointer;
      background-color: #4717F6;
    }
`;
const ViewPlaylist = () => {
    const playlistName = "My Mood Playlist";
    const [userID, setUserID] = useState("");

    const [token, setToken] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    })

    useEffect(() => {
        if (token) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserID(data.id);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                })
        }
    }, [token]);


    const [playlistID, setPlaylistID] = useState("");
    const [playlists, setPlayists] = useState([]);
    const [playlist, setPlayist] = useState([]);

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                setPlayists(data.items);

                // Find the playlist by name and set the playlistID
                if (Array.isArray(data.items)) {
                    const selectedPlaylist = data.items.find(item => item.name === playlistName);
                    if (selectedPlaylist) {
                        setPlaylistID(selectedPlaylist.id);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, [userID, token, playlistName]);

    useEffect(() => {
        // Fetch tracks when playlistID is available
        if (playlistID) {
            fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    setPlayist(data.items);
                })
                .catch((error) => {
                    console.error("Error fetching playlist tracks:", error);
                });
        }
    }, [playlistID, token]);

    console.log(playlist)

    return(
        <div>
            <Navbar/>
            <Container>
                <Center>
                    <ContentBox>
                        <Title>{playlistName}</Title>
                        {playlist.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            <Playlist>
                                {playlist.map((song) => (
                                    <Song>{song.track.artists.map((artist) => artist.name).join(", ")} - {song.track.name}</Song>
                                ))}
                            </Playlist>
                        )}
                    </ContentBox>
                </Center>
            </Container>
        </div>
    )

}

export default ViewPlaylist;