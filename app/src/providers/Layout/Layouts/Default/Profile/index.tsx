import { Avatar, Dropdown, Flex, Typography, Menu } from 'antd';
import { EllipsisVertical, LogOutIcon, User } from 'lucide-react';
import { useAdmin, useGlobal } from '@/hooks';

const { Text } = Typography;

export const UserProfile = () => {
  const { user, collapsed } = useGlobal();
  const { logout } = useAdmin();

  if (!user) return null;

  console.log(collapsed);

  return (
    <Dropdown
      arrow
      trigger={['click']}
      placement="top"
      menu={{
        items: [
          {
            key: '1',
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
                    transform: collapsed ? 'translateX(-6px)' : undefined,
                  }}
                >
                  <Avatar size={32} shape="square" icon={<User size={16} />} />
                </Flex>
              ),
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
