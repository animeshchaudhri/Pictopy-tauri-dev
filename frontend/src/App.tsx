import "./App.css";
import Datawise from "./components/datewise/Datawise";
import Main_menu from "./components/main_menu/main_menu";
// import Main_menu from "./components/main_menu/main_menu";
// import Test2 from "./components/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
// import FileBrowser from "./components/Test";
function App() {
  return (
    <>
      {/* <FileBrowser /> */}
      {/* <Test2 />
       */}
      <div className="flex flex-col w-full ">
        <Navbar />
        <div className="flex sidebar "style={{ height: 'calc(100vh - 64px)' }}>
          <Sidebar />
          <div className=" flex flex-col bg-gray-900 text-white p-4">
            {/* Add your content here */}
            <Main_menu />
            <Datawise />
            {/* <h1 className="text-2xl font-bold">Dashboard Content</h1> */}
          </div>
        </div>
      </div>
      {/* <Main_menu /> */}
    </>
  );
}

export default App;
