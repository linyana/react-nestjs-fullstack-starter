import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { HeaderUser } from './Profile';

type IPropsType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ collapsed, setCollapsed }: IPropsType) => (
  <Flex
    justify="space-between"
    align="center"
    style={{
      width: '100%',
    }}
  >
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      size="large"
    />
    <HeaderUser />
  </Flex>
);
