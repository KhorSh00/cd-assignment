import React, { useState } from "react";
import MoodSelector from "../component/moodSelector";

const Community = () => {
    const handleMoodSelect = (mood) => {
        if (mood) {
            console.log("Selected Mood:", mood);
            //TODO
        }
    };

    return (
        <>
           <h3>this is community page</h3>
           
           <MoodSelector onSelectMood={handleMoodSelect} />

        </>
    );
}

export default Community;