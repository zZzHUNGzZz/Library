import { Route, Routes } from "react-router-dom";
import Folowing from './../../scenes/Folowing';
import DashBroad from "../../scenes/Dashbroad";

const PageRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DashBroad />}></Route>
                <Route path='/folowing' element={<Folowing />}></Route>
            </Routes >
        </>
    )
}

export default PageRouter;