import React, {Component} from 'react';
import {Route , Switch , Redirect} from 'react-router-dom' ;
import MentorsList from "./MentorsList";
import MentorNewForm from "./MentorNewForm";
import MentorDetails from "./MentorDetails";


class Mentors extends Component {
    render() {
        return (
            <div className='container'>
                <Switch>
                    <Route path='/mentors/list' component={MentorsList}/>
                    <Route path='/mentors/new' component={MentorNewForm}/>
                    <Route path='/mentors/:id' component={MentorDetails}/>
                    <Route path='/mentors' component={()=><Redirect to='/mentors/list'/>}/>
                </Switch>
            </div>
        );
    }
}


export default Mentors;
