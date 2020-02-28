import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ShipmentIndex from './shipment-index/ShipmentIndex'
import ShipmentInfo from './shipment-info/ShipmentInfo'

const Shipments = () => {
  return (
    <Switch>
      <Route path="/shipments/:id">
        <ShipmentInfo />
      </Route>
      <Route path="/shipments" exact>
        <ShipmentIndex />
      </Route>
    </Switch>
  )
}

export default Shipments
