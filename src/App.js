import './App.css';
import Timer from './timer/timer.js'

const App = (() => {
  return (
    <div>
      <head>
        <title>my_study_timer ⏲️</title>
      </head>
      <body>
        <div id='aura'>
          <Timer/>
        </div>
      </body>
    </div>
  )

});

export default App;
