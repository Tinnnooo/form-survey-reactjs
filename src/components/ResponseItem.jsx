import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import ResponseListItem from './ResponseListItem';

export default function ResponseItem({ formSlug }) {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axiosClient.get(`v1/forms/${formSlug}/responses`).then(({ data }) => {
            setResponses(data.responses);
        }).catch(({ response }) => {
            console.log(response.data);
        })
    }, []);
    return (
        <table className="table mt-3">
            <caption>Total Responses: {responses.length}</caption>
            {responses && responses.map((response, ind) => <ResponseListItem response={response} key={ind} />)}
        </table>
    )
}
