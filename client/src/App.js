import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ListAccounts from './components/ListAccounts';
import NavBar from './components/NavBar';
import AccountDetails from './components/AccountDetails';
import AccountShow from './components/AccountShow';
import Play from './components/Play';
import PostGame from './components/PostGame';
import InternalStorage from './components/internalStorage';
import PlayNow from './components/PlayNow';
import Multiplayer from './components/Multiplayer';
import Room from './components/Room';
import About from './components/About';
import AboutSingle from './components/AboutSingle';
import AboutMultiplayer from './components/AboutMultiplayer';

// import ChatRoom from './components/ChatRoom'
// import Contacts from './components/Contacts';
// import Conversations from './components/Conversations';
// import { ContactsProvider } from './context/ContactsProvider';

function App() {
  const [ token, setToken ] = InternalStorage('token');
  const [ inGame, setInGame ] = useState(false);
  const [ win, setWin ] = useState(null);
  const [ userKills, setUserKills ] = useState(0);
  

  return (
    <Router>
      <div className='content' />
      <Switch>
        <Route exact path="/">
          <Home token={token} setToken={setToken} />
        </Route>
        <div>
        <NavBar token={token} setToken={setToken} inGame={inGame}/>
        {/* <Route exact path="/chatroom">
          <ContactsProvider>
            <ChatRoom token={token} />
          </ContactsProvider>
        </Route>
        <Route exact path="/contacts">
          <ContactsProvider>
            <Contacts token={token} />
          </ContactsProvider>
        </Route>
        <Route exact path="/conversations">
          <ContactsProvider>
            <Conversations token={token} />
          </ContactsProvider> */}
        {/* </Route> */}
        <Route exact path="/room">
          <Room token={token} />
        </Route>
         <Route exact path="/about">
          <About token={token} />
        </Route>
        <Route exact path="/multiplayer">
          <Multiplayer token={token} />
        </Route>
        <Route exact path="/aboutmultiplayer">
          <AboutMultiplayer token={token} />
        </Route>
        <Route exact path="/aboutsingle">
          <AboutSingle token={token} />
        </Route>
        <Route exact path="/playnow">
          <PlayNow token={token} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/postgame">
          <PostGame token={token} win={win} userKills={userKills} setInGame={setInGame} inGame={inGame} />
        </Route>
        <Route path="/signin" >
          <SignIn setToken={setToken} token={token}/>
        </Route>
        <Route path="/accounts/:id">
          <AccountShow token={token}/>
        </Route>
        <Route path="/listaccounts">
          <ListAccounts  token={token}/>
        </Route>
        <Route path="/accountdetails">
          <AccountDetails token={token}/>
        </Route>
        <Route path="/play">
          <Play token={token} setToken={setToken} setUserKills={setUserKills} userKills={userKills} inGame={inGame} setInGame={setInGame} setWin={setWin} />
        </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
