import React from 'react';
import { PageHeader } from 'antd';
import TopNav from '../components/TopNav';


interface IProps {
    subTitle?: string;
}

function TopBar( props: IProps ) {
  return (
    <PageHeader 
        title="原神DPS排行"
        subTitle={props.subTitle}
        avatar={{src:'https://uploadstatic.mihoyo.com/ys-obc/2021/08/23/75276545/666155bbd60391341253e4b1daace9d4_2687379046030308520.png'}}
        extra={[
          <TopNav key="1" />
        ]}
      />
  );
}

export default TopBar;
