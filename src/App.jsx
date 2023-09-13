import Content from "./Component/Content";
// import Sidebar from "./Component/Sidebar";
import "./scss/style.scss";

function App() {
  return (
    <div className="App">
      <div className="main_content col-md-12">
        {/* <Sidebar /> */}
        <Content />
      </div>
    </div>
  )
}

export default App
