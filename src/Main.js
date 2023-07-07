import Home from './pages/Home'
import FirstInfo from './pages/FirstInfo'
import SecondInfo from './pages/SecondInfo'
import ThirdInfo from './pages/ThirdInfo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import LastPage from './pages/LastPage'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/first-page" component={FirstInfo} />
        <Route path="/second-page" component={SecondInfo} />
        <Route path="/third-page" component={ThirdInfo} />
        {/* <Route path="/result" component={LastPage} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default Main
