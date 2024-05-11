import { Route, Routes } from "react-router-dom";
import DashBroad from "../../scenes/Dashbroad";
import ManageBorrowReturning from "../../scenes/Manager/Borrow/ManageBorrowReturning";
import MemberBorrowReturning from "../../scenes/Manager/Borrow/MemberBorrowReturning";
import Document from "../../scenes/Manager/Document";
import DocumentInfo from "../../scenes/Manager/DocumentInfo";
import Member from "../../scenes/Manager/Member/Member";
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

const PageRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DashBroad />}></Route>
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

            </Routes>
        </>
    )
}

export default PageRouter;