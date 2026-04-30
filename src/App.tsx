import { Router, Switch, Route } from "wouter";
import { Portfolio } from "@/pages/Portfolio";
import { AboutMePage } from "@/pages/AboutMe";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/about" component={AboutMePage} />
        <Route path="/" component={Portfolio} />
      </Switch>
    </Router>
  );
}

export default App;
