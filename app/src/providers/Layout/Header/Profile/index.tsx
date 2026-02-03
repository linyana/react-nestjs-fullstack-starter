import { Avatar, Dropdown, Divider, Space } from 'antd';
import { LogOut, User } from 'lucide-react';
import { useAdmin, useGlobal } from '@/hooks';

const MenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}> = ({ icon, label, onClick, danger }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      borderRadius: 8,
      cursor: 'pointer',
      color: danger ? '#dc2626' : '#111827',
      transition: 'background-color 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#f3f4f6';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
  >
    {icon}
    <span
      style={{
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  </div>
);

export const HeaderUser = () => {
  const { user } = useGlobal();
  const { logout } = useAdmin();

  if (!user?.name) return null;

  const overlay = (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        background: '#fff',
        padding: 16,
        minWidth: 200,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginRight: 16,
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          <Avatar size={56} icon={<User size={32} />} />
          <span
            style={{
              position: 'absolute',
              right: 2,
              bottom: 2,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #fff',
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#111827',
            }}
          >
            {user?.name || 'User'}
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#6b7280',
            }}
          >
            {user?.email}
          </div>
        </div>
      </div>

      <Divider
        style={{
          margin: '12px 0',
        }}
      />

      <MenuItem
        icon={<LogOut size={18} />}
        label="Logout"
        danger
        onClick={() => {
          logout({
            message: null,
          });
        }}
      />
    </div>
  );

  return (
    <Dropdown trigger={['hover']} popupRender={() => overlay}>
      <Space
        style={{
          cursor: 'pointer',
          padding: '0 12px',
          userSelect: 'none',
        }}
      >
        <Avatar size="small" icon={<User size={16} />} />
        <span
          style={{
            fontWeight: 500,
          }}
        >
          {user?.name}
        </span>
      </Space>
    </Dropdown>
  );
};
