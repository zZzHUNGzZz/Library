import { Route, Routes } from "react-router-dom";
import DashBroad from "../../scenes/Dashbroad";
import ManageBorrowReturning from "../../scenes/Manager/Borrow/ManageBorrowReturning";
import Document from "../../scenes/Manager/Document";
import DocumentInfo from "../../scenes/Manager/DocumentInfo";
import MemberCard from "../../scenes/Manager/Member/MemberCard";
import MemberHistory from "../../scenes/Manager/Member/MemberHistory";
import BorrowReturnStatistic from "../../scenes/Manager/Statistic/BorrowReturnStatistic";
import DocumentStatistic from "../../scenes/Manager/Statistic/DocumentStatistic";
import MemberStatistic from "../../scenes/Manager/Statistic/MemberStatistic";
import Author from "../../scenes/Manager/General/Author";
import Supplier from "../../scenes/Manager/General/Supplier";
import Publisher from "../../scenes/Manager/General/Publisher";
import Language from "../../scenes/Manager/General/Language";
import Punish from "../../scenes/Manager/General/Punish";
import Member from "../../scenes/Manager/Member/Member";
import MemberBorrowReturning from "../../scenes/Manager/Borrow/MemberBorrowReturning";
import Login from "../../scenes/Login";
import MainLayout from "../Layout";
import RequireAuth from "../RequireAuth";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";

const ROLES = {
    'Unknown': 0,
    'User': 1,
    'Admin': 2,
}

const PageRouter = () => {
    const numberRole = useContext(RoleContext)
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route element={<RequireAuth allowedRoles={ 1 === ROLES.Admin ? 1 : 0} />}>
                    <Route path='/' element={<MainLayout />}>
                        <Route path='/dashbroad' element={<DashBroad />}></Route>
                        <Route path='/document' element={<Document />}></Route>
                        <Route path='/document-info' element={<DocumentInfo />}></Route>
                        <Route path='/manage-borrow-returning' element={<ManageBorrowReturning />}></Route>
                        <Route path='/member-borrow-returning' element={<MemberBorrowReturning />}></Route>

                        <Route path='/member' element={<Member />}></Route>
                        <Route path='/member-card' element={<MemberCard />}></Route>
                        <Route path='/member-history' element={<MemberHistory />}></Route>
                        <Route path='/borrow-return-statistic' element={<BorrowReturnStatistic />}></Route>
                        <Route path='/document-statistic' element={<DocumentStatistic />}></Route>
                        <Route path='/member-statistic' element={<MemberStatistic />}></Route>

                        {/* general */}
                        <Route path='/author' element={<Author />}></Route>
                        <Route path='/supplier' element={<Supplier />}></Route>
                        <Route path='/publisher' element={<Publisher />}></Route>
                        <Route path='/language' element={<Language />}></Route>
                        <Route path='/punish' element={<Punish />}></Route>


                    </Route>
                    {/* other */}
                    <Route path='*' element={<div>Page Not Found!</div>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default PageRouter;