

import { GoogleOAuthProvider } from '@react-oauth/google';

import Messenger from './components/Messenger';
import AccountProvider from './constants/AccountProvider';
function App() {
  const clientId='178282863955-dbu2d7gojksfvsvq9l7cvjip7obbrc99.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
