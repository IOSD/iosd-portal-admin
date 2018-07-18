import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route , Switch , Redirect } from 'react-router-dom' ;
import MentorsList from "./MentorsList";
import MentorAdd from './MentorAdd';
import MentorEdit from './MentorEdit';
import { fetchMentors } from '../../actions/mentorActions';

class Mentors extends Component {
    
    componentWillMount() {
        if (this.props.mentors.length === 0 ) {
            this.props.fetchMentors();
        };
    };
    
    render() {
        return (
            <div className='container'>
                <Switch>
                    <Route path='/mentors/list' component={MentorsList}/>
                    <Route path='/mentors/new' component={MentorAdd}/>
                    <Route path='/mentors/:id' component={MentorEdit}/>
                    <Route path='/mentors' component={()=><Redirect to='/mentors/list'/>}/>
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = ({mentors}) => ({
   mentors
})

const mapDispatchToProps = (dispatch) => ({
    fetchMentors: () => dispatch(fetchMentors())    
})


export default connect(mapStateToProps, mapDispatchToProps)(Mentors);
