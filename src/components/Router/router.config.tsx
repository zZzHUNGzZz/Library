import { Route, Routes } from "react-router-dom";
import DashBroad from "../../scenes/Dashbroad";
import ManageBorrowReturning from "../../scenes/Manager/Borrow/ManageBorrowReturning";
import MemberBorrowReturning from "../../scenes/Manager/Borrow/MemberBorrowReturning";
import Document from "../../scenes/Manager/Document/Document";
import DocumentInfo from "../../scenes/Manager/Document/DocumenInfo";
import Quote from "../../scenes/Manager/Document/Quote";
import Member from "../../scenes/Manager/Member/Member";
import MemberCard from "../../scenes/Manager/Member/MemberCard";
import MemberHistory from "../../scenes/Manager/Member/MemberHistory";
import BorrowReturnStatistic from "../../scenes/Manager/Statistic/BorrowReturnStatistic";
import DocumentStatistic from "../../scenes/Manager/Statistic/DocumentStatistic";
import MemberStatistic from "../../scenes/Manager/Statistic/MemberStatistic";

const PageRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DashBroad />}></Route>
                <Route path='/document' element={<Document />}></Route>
                <Route path='/document-info' element={<DocumentInfo />}></Route>
                <Route path='/quote' element={<Quote />}></Route>
                <Route path='/manage-borrow-returning' element={<ManageBorrowReturning />}></Route>
                <Route path='/member-borrow-returning' element={<MemberBorrowReturning />}></Route>
                <Route path='/member' element={<Member />}></Route>
                <Route path='/member-card' element={<MemberCard />}></Route>
                <Route path='/member-history' element={<MemberHistory />}></Route>
                <Route path='/borrow-return-statistic' element={<BorrowReturnStatistic />}></Route>
                <Route path='/document-statistic' element={<DocumentStatistic />}></Route>
                <Route path='/member-statistic' element={<MemberStatistic />}></Route>
            </Routes>
        </>
    )
}

export default PageRouter;