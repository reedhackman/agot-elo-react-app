import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      //
    }
  }
  render(){
    let id = this.props.id
    let opponents = {}
    let rows = []
    const addOpponent = (p_id) => {
      opponents[p_id] = {
        wins: 0,
        losses: 0
      }
    }
    this.props.games.wins.forEach((game) => {
      if(!(opponents[game.loser_id])){
        addOpponent(game.loser_id)
      }
      opponents[game.loser_id].wins++
    })
    this.props.games.losses.forEach((game) => {
      if(!(opponents[game.winner_id])){
        addOpponent(game.winner_id)
      }
      opponents[game.winner_id].losses++
    })
    for(let p_id in opponents){
      let opponent = opponents[p_id]
      rows.push(
        <tr key={p_id}>
          <td className='player-opponent-name'><Link to={`/players/${p_id}`} onClick={this.props.updateId} value={p_id}>{this.props.players[p_id].name}</Link></td>
          <td className='player-opponent-percent'>{(100 * opponent.wins / (opponent.wins + opponent.losses)).toFixed(1)}</td>
          <td className='player-opponent-played'>{opponent.wins + opponent.losses}</td>
          <td className='player-opponent-rating'>{Math.round(this.props.players[p_id].rating)}</td>
        </tr>
      )
    }
    return(
      <div className='wrapper'>
        <h2>Opponents</h2>
        <table>
          <thead>
            <tr>
              <th className='player-opponent-name'>Opponent Name</th>
              <th className='player-opponent-percent'>Win Percent</th>
              <th className='player-opponent-played'>Times Played</th>
              <th className='player-opponent-rating'>Current Rating</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
