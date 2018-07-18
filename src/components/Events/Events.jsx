import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route , Switch , Redirect } from 'react-router-dom' ;
import { fetchEvents } from '../../actions/eventActions';
import EventsList from "./EventsList";
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';

class Events extends Component {

    componentWillMount() {
        if (this.props.events.length === 0 ) {
            this.props.fetchEvents();
        };
    };

    render() {
        return (
            <div className='container'>
                <Switch>
                    <Route path='/events/list' component={EventsList}/>
                    <Route path='/events/new' component={EventAdd}/>
                    <Route path='/events/:id' component={EventEdit}/>
                    <Route path='/events' component={()=><Redirect to='/events/list'/>}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ events }) => ({
    events
});

const mapDispatchToProps = (dispatch) => ({
    fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
