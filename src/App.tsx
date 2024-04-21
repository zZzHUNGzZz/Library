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
                  borderRadius: 5,
               },
               Input: {
                  borderRadius: 3,
               },
               InputNumber: {
                  borderRadius: 3,
               },
               Table: {
                  headerBg: '#0958d9',
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
         <MainLayout />
      </ConfigProvider>
   );
};

export default App;
