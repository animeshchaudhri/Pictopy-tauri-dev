function Navbar(props: { title?: string }) {
  return (
    <>
      <header className="flex h-16 w-full items-center justify-between bg-[#333333] px-6 ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6 text-gray-50 fill-[#6465F3]" />
            <span className="text-lg font-bold font-sans text-gray-50">
              Pictopy
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-sans font-medium text-gray-50">
            Welcome {props.title || "User"}
          </span>
        </div>
      </header>
    </>
  );
}

export default Navbar;
function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
