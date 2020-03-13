import React from 'react';

class RequestJokes extends React.Component {


    render() {
        return (
            <div className="row" style={{width: "50%", marginLeft: "auto", marginRight: "auto",
            
            width: '15em',
            height: '5em'}} > 
            <button className=" col-sm btn btn-light rounded-0" onClick={this.props.onClick.bind(this)} style={btnStyle}>{this.props.title}</button>
            </div>
        )
    }
}

const btnStyle = {
    borderColor: "black",
    cursor: 'pointer',
    font: '1.2em Calibri'
}

export default RequestJokes;
