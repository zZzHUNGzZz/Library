import { Route, Routes } from "react-router-dom";
import Home from "./../../scenes/Home"
import Folowing from './../../scenes/Folowing';

const PageContent = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/folowing' element={<Folowing />}></Route>
            </Routes >
        </>
    )
}

export default PageContent;