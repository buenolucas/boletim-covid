import { Layout } from "antd";

import { CreateCovidBoletim } from "./forms/CreateCovidBoletim";
import CreateCovidReport from "./screens/CreateCovidReport";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <div className="app">
          <CreateCovidReport />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
