import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route , Switch , Redirect } from 'react-router-dom' ;
import { fetchEvents } from '../../actions/eventActions';
import EventsList from "./EventsList";
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    };

    componentWillMount() {
        if (this.props.events.length === 0 ) {
            this.props.fetchEvents()
            .then(() => this.setState({loading: false}))
        } else {
            this.setState({loading: false});
        }
    };

    render() {
        if(this.state.loading) {
            return <h1>Loading</h1>
        }
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
