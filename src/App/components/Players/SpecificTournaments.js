import React from 'react'

export default class extends React.Component{
  state = {
    tournaments: []
  }
  async componentDidMount(){
    let list = []
    this.props.games.wins.forEach((game) => {
      if(!(list.includes(game.tournament_id))){
        list.push(game.tournament_id)
      }
    })
    this.props.games.losses.forEach((game) => {
      if(!(list.includes(game.tournament_id))){
        list.push(game.tournament_id)
      }
    })
    list = JSON.stringify(list)
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + `api/tournaments/ids/${list}/${this.props.id}`)
    const data = await res.json()
    this.setState({
      tournaments: data
    })
  }
  render(){
    console.log(this.state.tournaments)
    let rows = []
    if(this.state.tournaments){
      this.state.tournaments.forEach((tournament) => {
        rows.push(
          <tr key={tournament.id}>
            <td className='player-opponent-name'><a href={`https://thejoustingpavilion.com/tournaments/${tournament.id}`} target='_blank'>{tournament.name}</a></td>
            <td>{tournament.date}</td>
            <td>{`${tournament.playerPosition}/${tournament.totalPlayers}`}</td>
          </tr>
        )
      })
    }
    return(
      <div>
        <h2>Tournaments Entered</h2>
        <table>
          <thead>
            <tr>
              <th className='player-opponent-name'>Tournament Name</th>
              <th>Tournament Date</th>
              <th>Placement</th>
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
