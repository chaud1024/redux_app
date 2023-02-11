import { Outlet } from "react-router-dom";
// Outlet represences all of the children
// when we put the layout component into our app
// it can then represent all of these children underneath

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout