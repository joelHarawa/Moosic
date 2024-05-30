import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {SearchFunction} from "./SearchFunction";
let moodData = require("./moods.json");

const Input = styled.input`
  background-color: #0E0B16;
  color: #A239CA;
  border: none;
  width: 80%;
  font-size: 25px;
  padding-top: 20px;
  outline: none;
  display: flex;
`;

const Dropdown = styled.ul`
    list-style: none;
    padding-left: 0;
`;

const Result = styled.li`
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



const SearchMood = () => {
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


    const searchFunction = (mood) => {
        const playlistData = {
            name: "My Mood Playlist",
            description: "A playlist based on my current mood",
            public: false
        }

        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Playlist created:', data);


                fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks?uris=${trackURI}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Track added to playlist:', data);
                        history.push('/view');
                        // Handle the track addition response
                    })
                    .catch(error => {
                        console.error('Error adding track to playlist:', error);
                        console.log("I can put a ball in the endzone")
                        // Handle errors
                    });
                // Handle the playlist creation response
            })

            .catch(error => {
                console.error('Error creating playlist:', error);
                // Handle errors
            });
    }



    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    }

    const filteredMoods = moodData.moods.filter((mood) =>
        mood.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <Input
                type="text"
                placeholder="Enter your mood"
                value={searchInput}
                onChange={handleSearch}
            />
            {searchInput.length > 0 && (
            <Dropdown>
                {filteredMoods.map((mood, index) => (
                    <Link to="/view" key={index}>
                        <Result onClick={searchFunction(mood)} key={index}>{mood}</Result>
                    </Link>
                ))}
            </Dropdown>
            )}
        </div>
    );
};

export default SearchMood;