import React, {createRef, useEffect, useState} from "react"
import {Link, RouteComponentProps} from "react-router-dom"
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import Spinner from "../spinner";
import {
    CreateVolunteerInput,
    EditVolunteerMutation,
    EditVolunteerMutationVariables,
    FindVolunteerQuery,
    FindVolunteerQueryVariables,
    Volunteer
} from "../../types";
import {CREATE_VOLUNTEER, EDIT_VOLUNTEER, FIND_VOLUNTEER, GET_VOLUNTEERS} from "../../queries/volunteers";
import {Text, Form, FormApi} from 'informed';

interface theProps extends RouteComponentProps {
    id: String
}

// Can be moved up to make the constants
const CREATE = 'CREATE';
const EDIT = 'EDIT';

const EditVolunteerPage = (props: RouteComponentProps<{id: string}>) => {

    const mode = props.match.params.id ? EDIT : CREATE;
    const [loadVolunteer, loadResult] = useLazyQuery<FindVolunteerQuery, FindVolunteerQueryVariables>(FIND_VOLUNTEER);
    const [editVolunteer, editedVolunteer] = useMutation<
        EditVolunteerMutation,
        EditVolunteerMutationVariables>(EDIT_VOLUNTEER, {
        refetchQueries: [{query: GET_VOLUNTEERS}]
    });
    const [createVolunteer, createdVolunteer] = useMutation<{ createClient: Volunteer }, { input: CreateVolunteerInput }>(CREATE_VOLUNTEER);

    const [formRef, setFormRef] = useState<FormApi<Volunteer>>(null);

    useEffect(() => {
        if(mode === EDIT)
            loadVolunteer({variables: {_id: props.match.params.id}})
    }, []);

    if(loadResult.loading)
        return <Spinner/>;

    const handleSubmit = () => {
        let values = formRef.getState().values;
        if(mode === EDIT) {
            editVolunteer({
                variables: {
                    ...values,
                    _id: volunteer._id
                }
            }).then(() => {
                props.history.push('/volunteers');
            });
        }
        if(mode === CREATE) {
            createVolunteer({
                variables: {
                    input: { ...values }
                }, refetchQueries: [{query: GET_VOLUNTEERS}]
            }).then(value => {
                props.history.push('/volunteers');
            });
        }
    };

    const volunteer = loadResult?.data?.volunteer;

    return (
        <div>
            <h1>{mode} Volunteer</h1>
            <Form
                initialValues={volunteer}
                getApi={(formRef: FormApi<Volunteer>) => setFormRef(formRef)}
                onSubmit={handleSubmit}
            >
                {({formApi, formState}) => (
                    <React.Fragment>
                        <label>id: </label><span>{volunteer?._id}</span>
                        <br/>
                        <label>Name: </label><Text field="name" type="text" />
                        <button>Submit</button>
                    </React.Fragment>
                )
                }
            </Form>
            <br/>
        </div>
    )

}

export default EditVolunteerPage
