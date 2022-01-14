import { Card, Typography } from "antd";
import React from "react";
import TopBar from "../../components/TopBar";

const { Title, Paragraph, Link } = Typography;

function Index() {
  return (
    <div>
      <TopBar subTitle="首页" />
      <Card>
        <Typography>
          <Title level={2}>介绍</Title>
          <Paragraph>
            本网站仅用于自娱自乐，一切有关原神的资料与数据均来自
            【<Link href="https://bbs.mihoyo.com/ys/obc/channel/map/189/25?bbs_presentation_style=no_header">
              米游社·观测Wiki
            </Link>】，
            仅供交流和学习使用，不用于任何商业用途
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}

export default Index;
