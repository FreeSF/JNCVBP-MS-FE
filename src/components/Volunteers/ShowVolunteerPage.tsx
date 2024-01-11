import React, { useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { useLazyQuery } from "react-apollo";
import { FindVolunteerQuery, FindVolunteerQueryVariables } from "../../types";
import { FIND_VOLUNTEER } from "../../queries/volunteers";
import Spinner from "../spinner";

interface theProps extends RouteComponentProps {
  id: string
}

const ShowVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {

  const [loadVolunteer, loadResult] = useLazyQuery<FindVolunteerQuery, FindVolunteerQueryVariables>(FIND_VOLUNTEER);

  useEffect(() => {
    loadVolunteer({ variables: { id: props.match.params.id } })
  }, []);


  if (loadResult.loading)
    return <Spinner />;

  const volunteer = loadResult?.data?.volunteer;

  return (
    <div>
      <h1>Show Volunteer</h1>
      <label>Id:</label><span>{volunteer?.id}</span><br />
      <label>Name:</label><span>{volunteer?.name}</span>
    </div>
  )

}

export default ShowVolunteerPage
