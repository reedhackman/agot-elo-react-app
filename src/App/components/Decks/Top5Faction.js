import React from 'react'
import { Link } from 'react-router-dom'

export default class extends React.Component{
  state = {
    rows: []
  }
  async componentDidMount(){
    const res = await fetch(`http://localhost:5000/api/top5faction/${this.props.faction}`)
    const data = await res.json()
    this.setState({
      rows: data
    })
  }
  render(){
    let rows = []
    this.state.rows.forEach((d) => {
      rows.push(
        <tr key={d.agenda}>
          <td className='decks-table-name'><Link to={`/decks/${this.props.faction}/${d.agenda}`}>{d.agenda}</Link></td>
          <td className='decks-table-percent'>{d.percent}</td>
          <td className='decks-table-played'>{d.played}</td>
        </tr>
      )
    })
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
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
