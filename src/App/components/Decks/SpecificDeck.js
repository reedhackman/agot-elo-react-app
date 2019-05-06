import React from 'react'

export default class extends React.Component{
  render(){
    let faction = this.props.match.params.faction
    let agenda = this.props.match.params.agenda
    return(
      <div>
        <h2>{faction + ' ' + agenda}</h2>
        <h3>Coming Soon</h3>
      </div>
    )
  }
}
