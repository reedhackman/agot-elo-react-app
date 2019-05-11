import React from 'react'
import { Route, Link } from 'react-router-dom'

import Top5Faction from '../components/Decks/Top5Faction'
import FactionDetailed from '../components/Decks/FactionDetailed'
import SpecificDeck from '../components/Decks/SpecificDeck'

class Decks extends React.Component{
  state = {
    factions: [
      'Baratheon',
      'Lannister',
      'Stark',
      'Greyjoy',
      'Targaryen',
      'Martell',
      'Tyrell',
      "Night's Watch"
    ]
  }
  render(){
    let list = []
    this.state.factions.forEach((faction) => {
      list.push(
        <Top5Faction faction={faction}/>
      )
    })
    return(
      <div className='content'>
        <h1>Decks</h1>
        <Route exact path='/decks' render={() => <div className='flex'>{list}</div>}/>
        <Route exact path='/decks/:faction' render={({ match }) => <FactionDetailed match={match}/>}/>
        <Route path='/decks/:faction/:agenda' render={({ match }) => <SpecificDeck match={match}/>}/>
      </div>
    )
  }
}

export default Decks
