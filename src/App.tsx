import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Global } from '@emotion/core'

import lightTheme from './theme/themes/light'
import normalize from './theme/normalize'
import globals from './theme/globals'

import Root from './layout/Root'
import Header from './layout/Header'

import Shipments from './pages/Shipments'
import About from './pages/About'

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Root>
        <Global styles={normalize} />
        <Global styles={globals} />
        <Router>
          <Header title="Shipments Client Portal" />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/shipments" />
            </Route>
            <Route path="/shipments" component={Shipments} />
            <Route path="/about" exact component={About} />
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </Router>
      </Root>
    </ThemeProvider>
  )
}
