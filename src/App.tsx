import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import PageRouter from "./components/Router/router.config";

const App = () => {
   return (
      <ConfigProvider
         theme={{
            components: {
               Typography: {
                  
               },
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
               Card: {

               },
               Form: {
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
