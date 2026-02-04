import { useGlobal } from '@/hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export const Header = () => {
  const { collapsed, actions } = useGlobal();
  return (
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
        onClick={() =>
          actions.set({
            collapsed: !collapsed,
          })
        }
        size="large"
      />
    </Flex>
  );
};
