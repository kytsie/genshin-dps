import {
  Button,
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Select,
  Table,
  TableColumnType,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Element } from "../../../apis/entity/element";
import { Role } from "../../../apis/entity/role";
import { getElementList } from "../../../apis/lambda/elementService";
import {
  addRole,
  getRoleList,
  removeRole,
  updateRole,
} from "../../../apis/lambda/roleService";
import TopBar from "../../../components/TopBar";

function RoleList() {
  const [form] = useForm<Role>();
  const [toggle, setToggle] = useState(false);
  const [elementList, setElementList] = useState<Element[]>([]);
  useEffect(() => {
    getElementList().then((res) => {
      setElementList(res);
    });
  }, [setElementList]);

  const [roleList, setRoleList] = useState<Role[]>([]);
  const fetchRoleList = async () => {
    const roleList = await getRoleList();
    setRoleList(roleList);
  };
  useEffect(() => {
    fetchRoleList();
  }, [setRoleList]);

  const showModal = () => {
    setToggle(true);
  };

  const handleOk = async () => {
    const role = await form.validateFields();
    if (role.id) {
      await updateRole(role);
      notification.success({
        message: "更新成功",
      });
    } else {
      await addRole(role);
      notification.success({
        message: "添加成功",
      });
    }
    fetchRoleList();
    setToggle(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setToggle(false);
    form.resetFields();
  };

  const handleEdit = (role: Role) => {
    form.setFieldsValue(role);
    showModal();
  };

  const handleRemove = async (rid: number) => {
    await removeRole(rid);
    notification.success({
      message: "删除成功",
    });
    fetchRoleList();
  };

  const columns: TableColumnType<Role>[] = [
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (value, record) => {
        return (
          <a href={record.wikiUrl} target="_blank">
            <Image
              width={50}
              height={50}
              src={value}
              preview={false}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
          </a>
        );
      },
    },
    {
      title: "角色",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "元素类型",
      dataIndex: "elementType",
      key: "elementType",
      render: (value) => {
        return elementList.find((el) => el.id === value).name || "无";
      },
    },
    {
      title: "元素爆发倍率",
      dataIndex: "elementBreakPercentage",
      key: "elementBreakPercentage",
      render: (value) => value + "%",
    },
    {
      title: "元素爆发CD",
      dataIndex: "elementBreakCoolDown",
      key: "elementBreakCoolDown",
      render: (value) => value + "s",
    },
    {
      title: "元素爆发解释",
      dataIndex: "elementBreakExplain",
      key: "elementBreakExplain",
    },
    {
      title: "操作",
      key: "actions",
      render: (_, record) => {
        return (
          <div>
            <Button onClick={() => handleEdit(record)}>编辑</Button>
            <Popconfirm
              title="是否确认删除"
              onConfirm={() => handleRemove(record.id)}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TopBar subTitle="角色列表" />
      <Card extra={<Button onClick={showModal}>添加</Button>}>
        <Table rowKey="id" columns={columns} dataSource={roleList} />
      </Card>
      {/* modal */}
      <Modal
        title="添加角色"
        visible={toggle}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ style: { width: 150 } }} form={form}>
          <Form.Item name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>

          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: "角色名称不能为空" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色头像链接"
            name="avatar"
            rules={[{ required: true, message: "角色头像链接不能为空" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色Wiki链接"
            name="wikiUrl"
            rules={[{ required: true, message: "角色Wiki链接不能为空" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色元素类型"
            name="elementType"
            rules={[{ required: true, message: "角色元素类型不能为空" }]}
          >
            <Select>
              {elementList.map((el) => (
                <Select.Option key={el.id} value={el.id}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="元素爆发倍率（%）"
            name="elementBreakPercentage"
            rules={[{ required: true, message: "元素爆发倍率不能为空" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="元素爆发CD（s）"
            name="elementBreakCoolDown"
            rules={[{ required: true, message: "元素爆发CD不能为空" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="说明"
            name="elementBreakExplain"
            rules={[{ required: true, message: "说明不能为空" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RoleList;
