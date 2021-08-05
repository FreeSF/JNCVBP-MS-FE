import React, {useEffect} from "react"
import {RouteComponentProps} from "react-router-dom"
import {useLazyQuery} from "@apollo/react-hooks";
import {FindVolunteerQuery, FindVolunteerQueryVariables} from "../../types";
import {FIND_VOLUNTEER} from "../../queries/volunteers";
import Spinner from "../spinner";

interface theProps extends RouteComponentProps {
    id: String
}

const ShowVolunteerPage = (props: RouteComponentProps<{id: string}>) => {

    const [loadVolunteer, loadResult] = useLazyQuery<FindVolunteerQuery, FindVolunteerQueryVariables>(FIND_VOLUNTEER);

    useEffect(() => {
        loadVolunteer({variables: {_id: props.match.params.id}})
    }, []);


    if(loadResult.loading)
        return <Spinner/>;

    const volunteer = loadResult?.data?.volunteer;
    console.log(volunteer);

    return (
        <div>
            <h1>Show Volunteer</h1>
            <label>Id:</label><span>{volunteer?._id}</span><br/>
            <label>Name:</label><span>{volunteer?.name}</span>
        </div>
    )

}

export default ShowVolunteerPage
