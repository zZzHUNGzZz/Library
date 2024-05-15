import { ConfigProvider } from "antd";
import MainLayout from "./components/Layout";
import Login from "./scenes/Login";
import { useState } from "react";

const App = () => {
   const [isLoginSuccess, setIsLoginSuccess] = useState(false);
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
         {<Login isLoginSuccess={async value => await setIsLoginSuccess(value)}/>}
         {isLoginSuccess &&<MainLayout />}
      </ConfigProvider>
   );
};

export default App;
