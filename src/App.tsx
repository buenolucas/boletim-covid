import { Layout } from "antd";

import { CreateCovidBoletim } from "./forms/CreateCovidBoletim";
import CreateCovidReport from "./screens/CreateCovidReport";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>covid-19 gv</Header>
      <Content>
        <div className="site">
          <CreateCovidReport />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
