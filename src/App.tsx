import {Global, ThemeProvider} from '@emotion/react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Root} from "./layout/Root"
import globals from './theme/globals'
import normalize from './theme/normalize'
import lightTheme from './theme/themes/light'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <Root />,
  },
])

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Global styles={normalize} />
      <Global styles={globals} />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
