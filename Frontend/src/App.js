import React from 'react'
import Landing from './Components/Landing/Landing';
import './index.css';
import {Route, Switch} from 'react-router-dom';
import Search from './Components/Search/Search';
import MainRes from './Components/MainRes/MainRes';
import Explore from './Components/Explore/Explore';
import GenreMain from './Components/Explore/GenreMain/GenreMain';
import Reg from './Components/Auth/Register/Reg';
import DevDisplay from './Components/DevDisplay/DevDisplay';
import Wild from './Components/Wild/Wild';
import EpicGames from "./Components/Explore/SearchByStores/EpicGames";
import Steam from "./Components/Explore/SearchByStores/SteamGames";
import Uplay from "./Components/Explore/SearchByStores/Uplay";
import WishlistData from "./Components/Dashboard/WishlistData";
import Dash from './Components/Dashboard/Dash'

const App = () => {
  // let user = localStorage.getItem("Username");
  return (
    <div>
        <Switch>
                  <Route path="/" component={Landing} exact />
                  <Route path="/search" component={Search} />
                  <Route path="/view/:gameid/:slug" component={MainRes} />
                  <Route path="/genre/:genrename/:genreid" component={GenreMain} />
                  <Route path="/explore" component={Explore} />
                  <Route path="/reg" component={Reg} />
                  <Route path="/dev/:devId/:devName" component={DevDisplay} />
                  <Route path="/dashboard" component={Dash} />
                  <Route path="/wishlist" component={WishlistData} />
                  <Route path="/epicgames" component={EpicGames} />
                  <Route path="/steam" component={Steam} />
                  <Route path="/gog" component={Uplay} />
                  <Route path="*" component={Wild}/>
        </Switch>
    </div>
  )
}

export default App
