import React from 'react'
import { Route, Link } from 'react-router-dom'

import Table from '../components/Players/Table'
import Specific from '../components/Players/Specific'

class Players extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerlist: [],
      page: 0,
      last: 0,
      sortby: 'name',
      ascending: true,
      input: '',
      mingames: 0,
      allplayers: {}
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleMin = this.handleMin.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
    this.handleLast = this.handleLast.bind(this)
  }
  handleNext(){
    if(this.state.page !== this.state.last){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setState({
        page: this.state.page + 1
      })
    }
  }
  handlePrev(){
    if(this.state.page !== 1){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setState({
        page: this.state.page - 1
      })
    }
  }
  handleFirst(){
    if(this.state.page !== 1){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setState({
        page: 1
      })
    }
  }
  handleLast(){
    if(this.state.page !== this.state.last){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setState({
        page: this.state.last
      })
    }
  }
  handleMin(event){
    let count = 0
    this.state.playerlist.forEach((player) => {
      if(player.wins + player.losses >= event.target.value){
        count++
      }
    })
    this.setState({
      mingames: event.target.value,
      page: 1,
      last: Math.ceil(count / 50)
    })
  }
  handleSearch(event){
    let count = 0
    this.state.playerlist.forEach((player) => {
      if((player.name).toLowerCase().indexOf((event.target.value).toLowerCase()) !== -1){
        count++
      }
    })
    this.setState({
      input: event.target.value,
      page: 1,
      last: Math.ceil(count / 50)
    })
  }
  handleSort(event){
    if(event.target.value === this.state.sortby){
      this.setState({
        ascending: !this.state.ascending
      })
    }
    else{
      this.setState({
        sortby: event.target.value,
        ascending: true,
        page: 1
      })
    }
  }
  async componentDidMount(){
    const res = await fetch('http://agot-elo-express-backend-env.jdzgb4sgag.us-west-2.elasticbeanstalk.com/api/players')
    const data = await res.json()
    let players = {}
    data.forEach((player) => {
      if(!(players[player.id])){
        players[player.id] = {
          id: player.id,
          name: player.name,
          wins: player.wins,
          losses: player.losses,
          rating: player.rating,
          percent: player.percent,
          played: player.played,
          peak: player.peak
        }
      }
      else{
        console.log('this is a bug')
      }
    })
    this.setState({
      playerlist: data,
      allplayers: players,
      page: Math.ceil(data.length / (data.length + 1)),
      last: Math.ceil(data.length / 50)
    })
  }
  render(){
    let handlers = {
      search: this.handleSearch,
      sortby: this.handleSort,
      mingames: this.handleMin,
      prev: this.handlePrev,
      first: this.handleFirst,
      next: this.handleNext,
      last: this.handleLast,
      change: this.handleChange
    }
    return(
      <div className='App'>
        <h1>Players</h1>
        <Route exact path='/players' render={() => {
          if(this.state.playerlist.length){
            return(
              <Table handlers={handlers} state={this.state}/>
            )
          }
          return(
            <h2>Loading Players...</h2>
          )
        }}/>
        <Route path='/players/:id' render={({ match }) => <Specific match={match} players={this.state.allplayers}/>}/>
      </div>
    )
  }
}

export default Players
