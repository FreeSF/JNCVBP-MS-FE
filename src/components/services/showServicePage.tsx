import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {useQuery} from "react-apollo";

const ShowServicePage:React.FC<TheProps> = props => {

  //useQuery

  return (
    <div>Service Page {props.match.params.id}</div>
  )

}

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {

}

export default ShowServicePage;