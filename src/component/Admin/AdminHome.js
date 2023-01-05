import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid"
import Navbar from "../Navbar/Navbar";


function AdminHome() {

    const [heading, setHeading] = useState("")
    const [reward, setReward] = useState("")

    const navigate = useNavigate()


    const onClick = async (e) => {

        const ui = uuid()
        const { data } = await axios.post("http://localhost:6969/admin/createsurvey", { title: heading, surveyId: ui, reward: reward }, { withCredentials: true })
        if (data.status == true)
            navigate('/admin/question/' + ui)
    }

    return (

        <section>
            <div style={{ display: "flex", margin: "10px" }}>
                <form onSubmit={(e) => { e.preventDefault() }} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input placeholder="Survey Heading" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />
                    <input placeholder="Reward" type="text" value={reward} onChange={(e) => setReward(e.target.value)} />
                    <button style={{ height: "50px", fontWeight: "6px", background: "blue" }}
                        onClick={onClick}>
                        Create Questions
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AdminHome