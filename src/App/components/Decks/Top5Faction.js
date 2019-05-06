import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  render(){
    let list = []
    let decks = []
    let faction = this.props.faction
    for(let agenda in this.props.decks[faction]){
      if(this.props.decks[faction][agenda].wins + this.props.decks[faction][agenda].losses > 75){
        decks.push({
          agenda: agenda,
          percent: this.props.decks[faction][agenda].wins / (this.props.decks[faction][agenda].wins + this.props.decks[faction][agenda].losses),
          played: this.props.decks[faction][agenda].wins + this.props.decks[faction][agenda].losses
        })
      }
    }

    decks.sort((a,b) => {
      return b.percent - a.percent
    })

    for(var i = 0; i < Math.min(5, decks.length); i++){
      console.log(decks)
      list.push(
        <tr key={i}>
          <td className='decks-table-name'><Link to={`/decks/${this.props.faction}/${decks[i].agenda}`}>{decks[i].agenda}</Link></td>
          <td className='decks-table-percent'>{(100 * decks[i].percent).toFixed(1)}</td>
          <td className='decks-table-played'>{decks[i].played}</td>
        </tr>
      )
    }
    return(
      <div className='top5faction'>
        <h2><Link to={`/decks/${this.props.faction}`}>{this.props.faction}</Link></h2>
        <table className='top5faction-table'>
          <thead>
            <tr>
              <th className='decks-table-name'>Agenda</th>
              <th className='decks-table-percent'>Win %</th>
              <th className='decks-table-played'># Played</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
}
