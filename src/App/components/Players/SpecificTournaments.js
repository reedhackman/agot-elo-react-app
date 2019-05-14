import React from 'react'

export default class extends React.Component{
  render(){
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
    let rows = []
    list.forEach((tournament_id) => {
      rows.push(
        <tr key={tournament_id}>
          <td>{tournament_id}</td>
        </tr>
      )
    })
    list.sort((a,b) => {return a - b})
    return(
      <div>
        <h2>Tournaments Entered</h2>
        <table>
          <thead>
            <tr>
              <th>Tournament Id</th>
              
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
