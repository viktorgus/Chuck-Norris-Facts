import React from 'react';
import './joke.css';

class JokeDisplayer extends React.Component {


    render() {
        return (
            <div className="row" style={rowStyle} > 
            <p className = "h2 joke" style={{fontStyle: "italic",marginLeft:"auto",marginRight:"auto"}}>{this.props.jokestring}</p>
            </div>
        )
    }
}

const rowStyle = {
    borderColor: "black",
    width:"40%", height:"50%" , marginLeft: "auto", marginRight: "auto"
}

export default JokeDisplayer;
