import { Avatar, Dropdown, Flex, Typography, Button } from 'antd';
import { LogOutIcon, User } from 'lucide-react';
import { useAdmin, useGlobal } from '@/hooks';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const HeaderUser = () => {
  const { user } = useGlobal();
  const navigate = useNavigate();
  const { logout } = useAdmin();

  if (!user) return null;

  return (
    <Dropdown
      arrow
      trigger={['click']}
      menu={{
        items: [
          {
            key: '1',
            label: (
              <Flex align="center" gap="8px">
                <Avatar size={32} icon={<User size={16} />} />
                <Flex vertical>
                  <Text strong>{user?.name || 'User'}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {user?.email}
                  </Text>
                </Flex>
              </Flex>
            ),
            disabled: true,
          },
          {
            type: 'divider',
          },
          {
            key: '2',
            label: 'Settings',
            onClick: () => {
              navigate('/settings');
            },
            icon: <SettingOutlined size={14} />,
          },
          {
            key: '3',
            danger: true,
            label: 'Log out',
            onClick: () => {
              logout({
                message: null,
              });
            },
            icon: <LogOutIcon size={14} />,
          },
        ],
      }}
    >
      <Button type="text" size="large">
        <Flex align="center" gap="8px">
          <Avatar size={24} icon={<User size={16} />} />
          <Flex vertical>
            <Text strong>{user?.name || 'User'}</Text>
          </Flex>
        </Flex>
      </Button>
    </Dropdown>
  );
};
