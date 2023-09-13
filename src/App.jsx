import Content from "./Component/Content";
import Sidebar from "./Component/Sidebar";
import "./scss/style.scss";

function App() {
  return (
    <div className="App row">
      <div className="main_content col-md-12 row">
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}

export default App
