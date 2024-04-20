import { ConfigProvider } from "antd";
import MainLayout from "./components/Layout";

const App = () => {
   return (
      <ConfigProvider
         theme={{
            components: {
               Typography: {
                  
               },
               Button: {
                  controlHeight: 35,
                  defaultBg: '#1677ff',
                  defaultColor: '#ffffff',
                  defaultHoverBg: '#0958d9',
                  defaultHoverColor: '#ffffff',
                  defaultActiveBg: '#0958d9',
                  defaultActiveColor: '#ffffff',
               },
               Input: {
                  borderRadius: 5,
               },
               Table: {
                  headerBg: '#0958d9',
                  headerColor: '#ffffff',
                  headerBorderRadius: 0,
                  rowHoverBg: '#e6f4ff',
                  rowSelectedBg: '#bae0ff',
               },
               Card: {

               }

            },
         }}
      >
         <MainLayout />
      </ConfigProvider>
   );
};

export default App;
