import { Route, Switch } from "react-router-dom";
import AddSurvey from "./pages/AddSurvey";

const App = () => {
  return(
    <div>
      <Switch>
        <Route path="/" component={AddSurvey}/>
      </Switch>
    </div>
  )
}

export default App;