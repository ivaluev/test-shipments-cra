import {Global, ThemeProvider} from '@emotion/react'
import Header from './layout/Header'
import Root from './layout/Root'
import {Pages} from './pages'
import globals from './theme/globals'
import normalize from './theme/normalize'
import lightTheme from './theme/themes/light'

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Root>
        <Global styles={normalize} />
        <Global styles={globals} />
        <Header title="Shipments Client Portal" />
        <Pages />
      </Root>
    </ThemeProvider>
  )
}
