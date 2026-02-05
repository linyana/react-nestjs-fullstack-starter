import { Avatar, Dropdown, Flex, Typography, Menu } from 'antd';
import { EllipsisVertical, LogOutIcon, User } from 'lucide-react';
import { useAuth, useGlobal } from '@/hooks';

const { Text } = Typography;

export const UserProfile = () => {
  const { user, collapsed } = useGlobal();
  const { logout } = useAuth();

  if (!user) return null;

  return (
    <Dropdown
      arrow
      trigger={['click']}
      placement={collapsed ? 'topLeft' : 'top'}
      menu={{
        items: [
          {
            key: '1',
            title: '',
            label: (
              <Flex align="center" gap="8px">
                <Avatar size={32} shape="square" icon={<User size={16} />} />
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
            key: '3',
            danger: true,
            title: '',
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
      <div>
        <Menu
          mode="inline"
          selectedKeys={[]}
          items={[
            {
              key: 'user-profile',
              icon: (
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    width: collapsed ? 32 : undefined,
                    transform: collapsed ? 'translateX(-8px) translateY(6px)' : undefined,
                  }}
                >
                  <Avatar size={32} shape="square" icon={<User size={16} />} />
                </Flex>
              ),
              title: '',
              label: collapsed ? null : (
                <Flex justify="space-between" align="center" gap="8px">
                  <Flex vertical>
                    <Text strong>{user?.name || 'User'}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {user?.email}
                    </Text>
                  </Flex>
                  <EllipsisVertical size={14} />
                </Flex>
              ),
            },
          ]}
          theme="light"
          styles={{
            item: {
              height: 48,
            },
          }}
        />
      </div>
    </Dropdown>
  );
};
