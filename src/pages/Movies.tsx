import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MovieIndex from './shipment-index/ShipmentIndex'
import MovieInfo from './shipment-info/MovieInfo'

const Movies = () => {
  return (
    <Switch>
      <Route path="/movies/:id">
        <MovieInfo />
      </Route>
      <Route path="/movies" exact>
        <MovieIndex />
      </Route>
    </Switch>
  )
}

export default Movies
