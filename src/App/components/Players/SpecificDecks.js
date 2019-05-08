import React from 'react'

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      //
    }
  }
  render(){
    let id = this.props.id
    let rows = []
    let decks = {}
    const addDeck = (faction, agenda) => {
      if(!(decks[faction])){
        decks[faction] = {
          [agenda]: {
            wins: 0,
            losses: 0,
            tournaments: []
          }
        }
      }
      else if(!(decks[faction][agenda])){
        decks[faction][agenda] = {
          wins: 0,
          losses: 0,
          tournaments: []
        }
      }
    }
    this.props.games.forEach((game) => {
      if(!(game.winner_faction && game.winner_agenda && game.loser_faction && game.loser_agenda)){
        return
      }
      if(game.winner_id == id){
        if(!(decks[game.winner_faction]) || !(decks[game.winner_faction][game.winner_agenda])){
          addDeck(game.winner_faction, game.winner_agenda)
        }
        decks[game.winner_faction][game.winner_agenda].wins++
        if(!(decks[game.winner_faction][game.winner_agenda].tournaments.includes(game.tournament_id))){
          decks[game.winner_faction][game.winner_agenda].tournaments.push(game.tournament_id)
        }
      }
      else if(game.loser_id == id){
        if(!(decks[game.loser_faction]) || !(decks[game.loser_faction][game.loser_agenda])){
          addDeck(game.loser_faction, game.loser_agenda)
        }
        decks[game.loser_faction][game.loser_agenda].losses++
        if(!(decks[game.loser_faction][game.loser_agenda].tournaments.includes(game.tournament_id))){
          decks[game.loser_faction][game.loser_agenda].tournaments.push(game.tournament_id)
        }
      }
      else{
        console.log('file a bug')
      }
    })
    for(let faction in decks){
      for(let agenda in decks[faction]){
        rows.push(
          <tr key={faction + agenda}>
            <td className='player-decks-faction'>{faction}</td>
            <td className='player-decks-agenda'>{agenda}</td>
            <td className='player-decks-percent'>{(100 * decks[faction][agenda].wins / (decks[faction][agenda].wins + decks[faction][agenda].losses)).toFixed(1)}</td>
            <td className='player-decks-played'>{decks[faction][agenda].wins + decks[faction][agenda].losses}</td>
            <td className='player-decks-tournament'>{decks[faction][agenda].tournaments.length}</td>
          </tr>
        )
      }
    }
    return(
      <div className='wrapper'>
        <h2>Decks Played</h2>
        <table>
          <thead>
            <tr>
              <th className='player-decks-faction'>Faction</th>
              <th className='player-decks-agenda'>Agenda</th>
              <th className='player-decks-percent'>Win %</th>
              <th className='player-decks-played'># Games</th>
              <th className='player-decks-tournament'># Tournaments</th>
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
