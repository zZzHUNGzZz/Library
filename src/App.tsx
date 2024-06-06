import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import PageRouter from "./components/Router/router.config";

import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';

import 'dayjs/locale/vi';
dayjs.locale('vi');

const App = () => {
   return (
      <ConfigProvider
         locale={locale}
         theme={{
            components: {
               Button: {
                  controlHeight: 35,
                  borderRadius: 4,
                  defaultBorderColor: '#1677ff',
                  defaultColor: '#1677ff',
                  defaultHoverColor: '#ffffff',
                  defaultActiveColor: '#ffffff',
                  defaultBg: '#ffffff',
                  defaultHoverBg: '#1677ff',
                  defaultActiveBg: '#0958d9',
               },
               Input: {
                  borderRadius: 3,
               },
               InputNumber: {
                  borderRadius: 3,
               },
               Table: {
                  headerBg: '#003eb3',
                  headerColor: '#ffffff',
                  headerBorderRadius: 0,
                  rowHoverBg: '#e6f4ff',
                  rowSelectedBg: '#bae0ff',
               },
               Upload: {
                  colorError: '#d9d9d9',
                  controlHeightLG: 60
               },
               DatePicker: {
                  borderRadius: 3,
               }
            },
         }}
      >
         <Routes>
            <Route path="/*" element={<PageRouter />} />
         </Routes>
      </ConfigProvider>
   );
};

export default App;
