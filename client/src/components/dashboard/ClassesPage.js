import React from "react";
import ClassCardMps from "./cards/ClassCardMps";
import ClassCardUbd from "./cards/ClassCardUbd";
import ClassCardSmp from "./cards/ClassCardSmp";
import ClassCardPs from "./cards/ClassCardPs";
import ClassCardSI from "./cards/ClassCardSi";
import ClassCardMP from "./cards/ClassCardMp";

const ClassesPage = () => {
    return (
        <div id="classes">
            <div id="classes-container">
                <ClassCardMps></ClassCardMps>
                <ClassCardUbd></ClassCardUbd>
                <ClassCardSmp></ClassCardSmp>
                <ClassCardPs></ClassCardPs>
                <ClassCardSI></ClassCardSI>
                <ClassCardMP></ClassCardMP>
            </div>
        </div>
    );
};

export default ClassesPage;