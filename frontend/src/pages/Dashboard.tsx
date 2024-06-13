import Datawise from "../components/datewise/Datawise";
import Main_menu from "../components/main_menu/main_menu";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";

function Dashboard() {
  return (
    <div>
      <div className="flex flex-col w-full ">
        <Navbar />
        <div className="flex sidebar " style={{ height: "calc(100vh - 64px)" }}>
          <Sidebar />
          <div className="flex">
            <div className=" flex flex-col bg-gray-900 text-white p-4">
              <Main_menu />
              <Datawise />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
