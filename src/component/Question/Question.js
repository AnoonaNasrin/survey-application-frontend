import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

import './Quest.css'

function Question() {

    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { surveyId } = useParams()

    const onSubmit = async (questions) => {
        const options = [questions.option1, questions.option2, questions.option3]
        console.log(options);

        try {
            const { data } = await axios.post("http://localhost:6969/admin/createquestion", { question: questions.question, options: options, surveyId: surveyId }, { withCredentials: true })
            if (data.status == true) {
                window.location.reload(false)
                // navigate('/admin/question/' + surveyId)
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <section>
            <div>
                <form id='form' onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col'>
                    <div className='qest' style={{ height: "" }}>
                        <textarea type="text" style={{ width: "750px" }} placeholder="Question" {...register("question")} />
                    </div>
                    <input type="text" placeholder="Option 1" {...register("option1")} />
                    <input type="text" placeholder="Option 2" {...register("option2")} />
                    <input type="text" placeholder="Option 3" {...register("option3")} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button style={{ background: "#B0F3F1", borderRadius: "5px", height: "60px", width: "150px", color: "black" }}>Add Another</button>
                        <button style={{ background: "#63D471", height: "60px", width: "150px", borderRadius: "5px", color: "white" }}>Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Question