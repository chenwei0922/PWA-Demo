import React, { useEffect, useState } from 'react';
import './App.css';

const ua = {
  isMobile: window.navigator.userAgent.match(/Mobile/i),
  isiOS: window.navigator.userAgent.match(/Mobile/i) && window.navigator.userAgent.match(/iPhone/i),
  isAndroid: window.navigator.userAgent.match(/Mobile/i) && window.navigator.userAgent.match(/Android/i),
  isSafari: window.navigator.userAgent.match(/Safari/i),
  isChrome: window.navigator.userAgent.match(/Chrome|CriOS/i),
  isMetaMask: window.navigator.userAgent.match(/MetaMaskMobile/i)
}
const getPWADisplayMode = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

const repo = "https://chenwei0922.github.io/PWA-Demo/";
let deferredPrompt;  
    
function App() {
  const [installable, setInstallable] = useState(false);
  const [tipText, setTipText] = useState('')

  useEffect(()=> {
    if(ua.isiOS){
      if(ua.isChrome){
        console.log('iOS>Chrome')
        setTipText('iOS>Chrome')
      }else if(ua.isSafari){
        console.log('ios->safri')
        setTipText('iOS>safri')
      }else if(ua.isMetaMask){
        setTipText('iOS>Metamask')
      }
    }else if(ua.isAndroid){
      if(ua.isChrome){
        console.log('android>Chrome')
        setTipText('android>Chrome')
      }else if(ua.isMetaMask){
        setTipText('android>Metamask')
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Install Demo</h2>
        <h3>window.navigator.standalone: {window.navigator.standalone?1:0}</h3>
        <h3>ua: {window.navigator.userAgent}</h3>
        {installable &&
          <button className="install-button" onClick={handleInstallClick}>
            INSTALL ME
          </button>
        }
        {tipText &&
          <p>
            {tipText}
          </p>
        }
        <h3>displayMode: {getPWADisplayMode()}</h3>

        <p>
          <a href={repo} className="App-link">View source on GitHub</a>
        </p>
      </header>
    </div>
  );
}

export default App;
