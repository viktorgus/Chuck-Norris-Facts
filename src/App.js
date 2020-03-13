import React from 'react';
import JokeDisplayer from './components/JokeDisplayer'
import RequestJokes from './components/RequestJokes'
import CircularProgress from '@material-ui/core/CircularProgress'
import norris from "./components/norris.png"
import './App.css';

var jokeTempVar

//Enums for representing state of App
const views = {
  main: "main",
  jokeAdded: "jokeAdded",
  loading: "loading"
}

class App extends React.Component {
  
  state = {
    oldJokeIDs: [],
    currentJoke: "  ",
    view: views.main,
    error :"",
    storedJokes: []
  };

  //fetches 20 new jokes from API
   fetchNewJoke = ()=> {
    this.setState({view: views.loading,error:""})
      fetch("http://api.icndb.com/jokes/random/20?escape=javascript")
      .then(res=> res.json())
      .then(res =>{
      if (res.type !== "success") {
        this.setState({error:res.value})
      } else {
        var jokeResponse = res.value
          this.setState(
            {
              storedJokes: jokeResponse,
            error:""})
        this.incrementJoke()

      }
    
    })
  }
  //if stored jokes are empty, fetch new, else increment
  setJoke = () => {
    if(this.state.storedJokes.length === 0){
      this.fetchNewJoke()
    }else {
      this.incrementJoke()
    }

  }

  //Increments next joke from stored array. if the joke is already viewed pops more off the stored arary until it empties, then fetch more jokes
  incrementJoke = () => {
    jokeTempVar = this.state.storedJokes.pop()
    while(this.state.oldJokeIDs.includes(jokeTempVar.id) && this.state.storedJokes.length>0){
      jokeTempVar = this.state.storedJokes.pop()
    }
    if(this.state.storedJokes.length===0 && this.state.oldJokeIDs.includes(jokeTempVar.id)){
      this.fetchNewJoke()
    } else {
      this.setState({currentJoke: jokeTempVar.joke, 
        oldJokeIDs: this.state.oldJokeIDs.concat(jokeTempVar.id), view: views.jokeAdded})
 
    }
  }
  

  resetView = ()=>{
    this.setState({    
      oldJokeIDs: [],
      currentJoke: "",
      view: views.main,
      storedJokes: [],
    error:""})
  }
  //Main Render Function. Changes components based on state.view
  renderView = () => {

    switch (this.state.view) {
      case views.main:
        return (
          <div className="container">
            <RequestJokes title="Grant me wisdom, great Chuck" onClick={this.setJoke}></RequestJokes>
            <div style={{marginTop:"4em"}}></div>
             
          </div>
        )

    case views.jokeAdded: 
          return (
            <div className="container">
              <RequestJokes title="More True Facts" onClick={this.setJoke}></RequestJokes>
              <JokeDisplayer jokestring = {this.state.currentJoke} > </JokeDisplayer>
         </div>
          )
    case views.loading:
      return(
        <div className="container">
          <RequestJokes title="More True Facts" onClick={this.setJoke}></RequestJokes>
          <CircularProgress color="inherit" size={50}></CircularProgress>
       </div>  
      )

      default:
        return
    }
  }


  render() {
    return (
      <div className="App" style={{ marginTop: '2rem' }}>
        <h1 style={headingStyle} onClick={this.resetView}>  Chuck Norris Encyclopedia </h1>
        {this.renderView()}
        <p style={{fontColor:"red"}}>{this.state.error}</p>
        <img style={{marginTop:"20px"}} alt="Chuck" src={norris}></img>
      </div>
    )
  }
}

const headingStyle = {
  textDecoration: 'none',
  textColor: 'black',
  cursor: 'pointer',
  size: 'auto',
  margin: '0.7em'
  
}



export default App;