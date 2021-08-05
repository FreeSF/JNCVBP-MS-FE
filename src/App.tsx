import React, {useEffect, useState} from 'react';
//import './App.css';
import {Route, RouteComponentProps, Switch} from 'react-router-dom'
import HomePage from "./components/homePage";
import './stylesheets/App.sass'
import TheNavBar from "./components/theNavBar";
import TheFooter from "./components/theFooter";
import VolunteersPage from "./components/Volunteers/VolunteersPage";
import EditVolunteerPage from "./components/Volunteers/EditVolunteerPage";
import ShowVolunteerPage from "./components/Volunteers/ShowVolunteerPage";

const App = () => {

    return (
        <div className="App">
            <TheNavBar/>
            <div className='app-container'>
                <Switch>
                    {/* All Routing here */}
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/volunteers' component={VolunteersPage}/>
                    <Route exact path='/volunteers/:id/edit' component={EditVolunteerPage}/>
                    <Route exact path='/volunteers/create' component={EditVolunteerPage}/>
                    <Route exact path='/volunteers/:id' component={ShowVolunteerPage}/>
                </Switch>
            </div>
            <TheFooter/>
        </div>
    )
};

export default App;
