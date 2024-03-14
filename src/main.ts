import './app.css'
import App from './App.svelte'

const appElement = document.getElementById('app');

if (appElement) {
  const app = new App({
    target: appElement,
    // other options or props if needed
  });

} else {
  console.error("Element with id 'app' not found.");
}
export default App;
