'use client';
import React from "react";
import { useState } from "react";
import { achievementList } from "./achievementData";
import "./achievement.css"

var Achievement = () => {

    //var achievementName : String = "name";
    //var achievementDescription : String = "desc";
    //const [isAchieved, setIsAchieved] = useState(false);

    function handleCheckMark()
    {
        if (achievementList[1].isAchieved)
        {
            return <img src = "../../public/checkMark-svgrepo.svg"></img>
        }
    }

    return (
        <div className = "achievement-box">
            <div className = "achievement-name">
                {achievementList[1].achievementName}
            </div>

            <div className = "achievement-desc">
                {achievementList[1].achievementDescription}
            </div>

            <div className = "achievement-image">
                Image
            </div>

            <div className = "achievement-complete">
                {handleCheckMark()}
            </div>
            
        </div>

    )
};

export default Achievement;