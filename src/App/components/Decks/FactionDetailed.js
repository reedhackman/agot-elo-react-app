import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sortby: 'name',
      ascending: true
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event){
    if(this.state.sortby == event.target.value){
      this.setState({
        ascending: !this.state.ascending
      })
    }
    else{
      this.setState({
        sortby: event.target.value,
        ascending: true
      })
    }
  }
  render(){
    let list = []
    let faction = this.props.match.params.faction
    let decks = []
    for(let agenda in this.props.decks[faction]){
      decks.push({
        name: agenda,
        percent: (100 * this.props.decks[faction][agenda].wins / (this.props.decks[faction][agenda].wins + this.props.decks[faction][agenda].losses)).toFixed(1),
        played: this.props.decks[faction][agenda].wins + this.props.decks[faction][agenda].losses
      })
    }
    decks.sort((a, b) => {
      if(this.state.ascending === true){
        if(this.state.sortby === 'name'){
          if(a[this.state.sortby] > b[this.state.sortby]){
            return 1
          }
          if(b[this.state.sortby] > a[this.state.sortby]){
            return -1
          }
          return 0
        }
        return b[this.state.sortby] - a[this.state.sortby]
      }
      if(this.state.sortby === 'name'){
        if(a[this.state.sortby] > b[this.state.sortby]){
          return -1
        }
        if(b[this.state.sortby] > a[this.state.sortby]){
          return 1
        }
        return 0
      }
      return a[this.state.sortby] - b[this.state.sortby]
    })
    decks.forEach((deck) => {
      list.push(
        <tr>
          <td><Link to={`/decks/${faction}/${deck.name}`}>{deck.name}</Link></td>
          <td>{deck.percent}</td>
          <td>{deck.played}</td>
        </tr>
      )
    })
    return(
      <div>
        <h2>{faction}</h2>
        <table>
          <thead>
            <tr>
              <th><button onClick={this.handleClick} value='name'>Agenda</button></th>
              <th><button onClick={this.handleClick} value='percent'>Win Percent</button></th>
              <th><button onClick={this.handleClick} value='played'>Games Played</button></th>
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
