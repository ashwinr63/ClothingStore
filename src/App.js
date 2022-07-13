
import { Routes, Route} from 'react-router-dom'

import Navigation from  './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'

const Shop = () => {
  return <h1> I'm Shop Component</h1>
}


const App = () => {

  return (

    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="auth" element={<Authentication/>} />
      </Route>
    </Routes>

  )
}

export default App;
