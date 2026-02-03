/* eslint-disable no-restricted-syntax */
import React, { useMemo, useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { IMenuPositionType, IRouteType } from '@/types';

const isMenuRoute = (position: IMenuPositionType) => (route: IRouteType) => {
  const { handle: { menu } = {}, path = '' } = route;
  if (!menu) return false;
  const pos = (menu.position ?? 'TOP') === position;
  const valid = path && !path.includes('*');
  return pos && valid;
};

const joinPaths = (basePath: string, subPath?: string) => {
  if (!subPath) return basePath;
  if (subPath.includes('https://')) return subPath;
  return `${basePath.replace(/\/$/, '')}/${subPath.replace(/^\//, '')}`;
};

const buildMenuItem = (route: IRouteType, parentPath = ''): any | null => {
  const menu = route?.handle?.menu;
  if (!menu) return null;

  const fullPath = route.path ? joinPaths(parentPath, route.path) : parentPath;

  const children =
    route.children?.map((child: IRouteType) => buildMenuItem(child, fullPath)).filter(Boolean) ||
    [];

  return {
    key: children.length ? `${fullPath}__group` : fullPath,
    label: menu.label,
    icon: menu.icon,
    ...(children.length
      ? {
          children,
        }
      : {}),
  };
};

const collectKeys = (items: any[]): string[] =>
  items.flatMap((item) => [item.key, ...(item.children ? collectKeys(item.children) : [])]);

export const LayoutRouteMenu: React.FC<{
  position: IMenuPositionType;
  style?: React.CSSProperties;
  routes: IRouteType[];
}> = ({ position, style, routes }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(
    () =>
      routes
        .filter(isMenuRoute(position))
        .map((r) => buildMenuItem(r))
        .filter(Boolean),
    [routes, position],
  );

  const selectedKey = useMemo(() => {
    const { pathname } = location;
    const keys = collectKeys(items);
    return keys.reduce(
      (match, key) => (pathname.startsWith(key) && key.length > match.length ? key : match),
      '',
    );
  }, [location.pathname, items]);

  useEffect(() => {
    if (!selectedKey) return;

    const findParents = (nodes: any[], parents: string[] = []): string[] => {
      for (const node of nodes) {
        if (node.key === selectedKey) return parents;
        if (node.children) {
          const res = findParents(node.children, [...parents, node.key]);
          if (res.length) return res;
        }
      }
      return [];
    };

    const parentKeys = findParents(items);
    setOpenKeys(parentKeys);
  }, [selectedKey, items]);

  return (
    <Menu
      mode="inline"
      items={items}
      theme="light"
      selectedKeys={selectedKey ? [selectedKey] : []}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys as string[])}
      onClick={(e) => {
        if (e.key.includes('http')) {
          window.open(e.key);
        } else {
          navigate(e.key);
        }
      }}
      style={style}
    />
  );
};
