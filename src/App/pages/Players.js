import React from 'react'
import { Route, Link } from 'react-router-dom'

import Table from '../components/Players/Table'
import Specific from '../components/Players/Specific'

class Players extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerlist: [],
      allplayers: {}
    }
  }

  async componentDidMount(){
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'api/players')
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
        console.log(player)
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
    return(
      <div className='content'>
        <h1>Players</h1>
        <Route exact path='/players' render={() => {
          if(this.state.playerlist.length){
            return(
              <Table players={this.state.playerlist}/>
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
