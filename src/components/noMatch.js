import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoMatch extends Component {
    render() {
        return (
            <div className="container">
                <p>404 not found</p>
            </div>
        );
    }
}


export default connect(null, null)(NoMatch);