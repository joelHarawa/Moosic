import React, {useEffect, useState} from "react";

export const SearchFunction = ({mood}) => {
    const [uris, setUris] = useState([]);

    useEffect(() => {
        const fetchUris = async () => {
            const moodData = require("./moods.json");
            const tracks = moodData.moods[mood] || [];

            const urisArray = tracks.map(track => track.uri);

            setUris(urisArray);
        };

        fetchUris();
    }, [mood]);

    return uris;
}

