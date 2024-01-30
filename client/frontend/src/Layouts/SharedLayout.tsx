import { Outlet } from "react-router-dom"

const SharedLayout = () => {
  return (
    <main className="min-w-screen max-w-screen bg-gray-200 font-roboto font-normal">
      <nav className="bg-white flex justify-between md:justify-around items-center h-[82px] shadow-sm px-2 w-full" data-aos="fade-down">
        <input type="search" name="" id="" className="bg-gray-200 w-full md:w-[70%] lg:w-3/4 h-[48px] px-4 rounded-lg outline-none focus:border focus:border-blue-500" />
        <button type="button" className="hidden md:block w-[90px] h-[48px] bg-blue-500 hover:bg-blue-400 text-white text-[14px] font-medium rounded-3xl" id="button">+ Add</button>
      </nav>
      <section className="px-4 md:px-8 lg:px-[128px]">
        <div className="mt-8 flex justify-between items-center" data-aos="fade-down">
          <h1 className="text-gray-900 text-[24px] font-semibold">Your notes</h1>
          <button type="button" className="md:hidden w-[90px] h-[48px] bg-blue-400 hover:bg-blue-500 text-white text-[14px] rounded-3xl mini-button" id="button">+ Add</button>
        </div>
        <div className="hidden md:flex items-center gap-1 mt-8" data-aos="fade-down">
          <input type="checkbox" name="" id="display" className="accent-[#212121] opacity-[36%]" />
            <label htmlFor="display" className="text-[14px] text-gray-900 text-center font-normal opacity-[87%]">Show only completed notes</label>
        </div>
        <div className="mt-8 w-full" data-aos="fade-down">
          <ul className="w-full flex justify-between text-center border-collapse border-b-2 border-black/[.02]">
            <li><button className="p-2 text-gray-900 opacity-[60%] hover:opacity-[87%] focus:border-b-2 focus:border-blue-400 focus:text-blue-400 focus:opacity-100 text-[16px] font-medium outline-none" autoFocus={true}>All</button></li>
            <li><button className="p-2 text-gray-900 opacity-[60%] hover:opacity-[87%] focus:border-b-2 focus:border-blue-400 focus:text-blue-400 focus:opacity-100 text-[16px] font-medium outline-none">PERSONAL</button></li>
            <li><button className="p-2 text-gray-900 opacity-[60%] hover:opacity-[87%] focus:border-b-2 focus:border-blue-400 focus:text-blue-400 focus:opacity-100 text-[16px] font-medium outline-none">HOME</button></li>
            <li><button className="p-2 text-gray-900 opacity-[60%] hover:opacity-[87%] focus:border-b-2 focus:border-blue-400 focus:text-blue-400 focus:opacity-100 text-[16px] font-medium outline-none">BUSINESS</button></li>
          </ul>
        </div>

        <section className="card-container grid justify-center xl:grid-cols-2">
          <Outlet />
        </section>
      </section>
    </main>
  )
}

export default SharedLayout
