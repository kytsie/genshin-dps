import {
  Button,
  Card,
  Image,
  Popover,
  Progress,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Role } from "../../apis/entity/role";
import { getElementList } from "../../apis/lambda/elementService";
import { getRoleList } from "../../apis/lambda/roleService";
import TopBar from "../../components/TopBar";

interface RoleInfo extends Role {
  dps: number;
  percent: number;
  color: string;
  rank: number;
}

const Line = ({ role }: { role: RoleInfo }) => {
  return (
    <Popover
      content={role.elementBreakExplain}
      title={`第${role.rank}名【${role.name}】倍率说明`}
    >
      <div className="line-box">
        <a href={role.wikiUrl} target="_blank">
          <Image width={50} height={50} src={role.avatar} preview={false} />
        </a>
        <Typography.Title level={4} className="role-name">
          {role.name}
        </Typography.Title>
        <div className="role-line">
          <Progress
            percent={role.percent}
            strokeColor={role.color}
            format={() => role.dps.toFixed(2) + "%"}
            status="normal"
          />
        </div>
      </div>
    </Popover>
  );
};

function ElementBreak() {
  const [roleList, setRoleList] = useState<RoleInfo[]>([]);

  const init = async () => {
    const elementList = await getElementList();

    const res = await getRoleList();
    const roleListTemp = res.map((role) => ({
      ...role,
      dps: role.elementBreakPercentage / role.elementBreakCoolDown,
      color:
        elementList.find((item) => item.id === role.elementType)?.color ||
        "grey",
    }));
    roleListTemp.sort((a, b) => b.dps - a.dps);
    const maxDps = roleListTemp[0].dps;
    const roleListCalc = roleListTemp.map((role, index) => ({
      ...role,
      percent: (role.dps / maxDps) * 100,
      rank: index + 1,
    }));
    setRoleList(roleListCalc);
  };

  useEffect(() => {
    init();
  }, [setRoleList]);

  return (
    <div>
      <TopBar subTitle="元素爆发排行" />
      <Card>
        {roleList.map((role) => (
          <Line key={role.id} role={role} />
        ))}
      </Card>
    </div>
  );
}

export default ElementBreak;
