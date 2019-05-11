import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      faction: this.props.match.params.faction,
      sortby: 'agenda',
      ascending: true,
      rows: []
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
  async componentDidMount(){
    const res = await fetch(`http://localhost:5000/api/decks/${this.state.faction}`)
    const data = await res.json()
    this.setState({
      rows: data
    })
  }
  render(){
    let list = []
    let faction = this.state.faction
    let decks = [...this.state.rows]
    decks.sort((a, b) => {
      if(this.state.ascending === true){
        if(this.state.sortby === 'agenda'){
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
      if(this.state.sortby === 'agenda'){
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
        <tr key={deck.agenda}>
          <td><Link to={`/decks/${faction}/${deck.agenda}`}>{deck.agenda}</Link></td>
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
              <th><button onClick={this.handleClick} value='agenda' className='button-sort'>Agenda</button></th>
              <th><button onClick={this.handleClick} value='percent' className='button-sort'>Win Percent</button></th>
              <th><button onClick={this.handleClick} value='played' className='button-sort'>Games Played</button></th>
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
