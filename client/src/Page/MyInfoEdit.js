import React, { useState } from "react";

function MyInfoEdit() {
    return (
        <div>
            <h1 className="myinfo-name">MY INFORMATION</h1>
            <h4>NickName</h4>
            <input type="text" className="nickname-box"></input>
            <h4>E-Mail</h4>

            <button>Edit</button>
        </div>
    );
}

export default MyInfoEdit;
