import { Outlet } from "react-router-dom";
import Header from "./Header";
// Outlet represences all of the children
// when we put the layout component into our app
// it can then represent all of these children underneath

const Layout = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout