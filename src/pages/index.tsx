import {Navigate, Route, Routes} from 'react-router-dom'
import About from './About'
import ShipmentIndex from './shipment-index/ShipmentIndex'
import ShipmentInfo from './shipment-info/ShipmentInfo'

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shipments" />} />
      <Route path="/shipments/*">
        <Route path="/:id" element={<ShipmentInfo />} />
        <Route path="/" element={<ShipmentIndex />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route element={<div>Not Found</div>} />
    </Routes>
  )
}
