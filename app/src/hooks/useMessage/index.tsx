import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { message } from 'antd';
import { nanoid } from 'nanoid';

type MessageArgsProps = Parameters<typeof message.open>[0];

type MESSAGE_TYPE = 'success' | 'error' | 'info' | 'warning' | 'loading';

type IMessageType = string | Omit<MessageArgsProps, 'type'>;

interface MessageApiContextType {
  success: (params: IMessageType) => string | number;
  error: (params: IMessageType) => string | number;
  info: (params: IMessageType) => string | number;
  warning: (params: IMessageType) => string | number;
  loading: (params: IMessageType) => string | number;
  dismiss: (key?: string | number) => void;
  clear: () => void;
}

const MessageApiContext = createContext<MessageApiContextType | null>(null);

export const MessageApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback(
    (type: MESSAGE_TYPE, params: IMessageType) => {
      let config: MessageArgsProps;

      if (typeof params === 'string') {
        config = {
          type,
          content: params,
        };
      } else {
        config = {
          type,
          ...params,
        };
      }

      if (config.key === undefined) {
        config.key = nanoid();
      }

      if (config.duration === undefined && type === 'loading') {
        config.duration = 0;
      }

      messageApi.open(config);
      return config.key as string | number;
    },
    [messageApi],
  );

  const api = useMemo<MessageApiContextType>(
    () => ({
      success: (p) => showMessage('success', p),
      error: (p) => showMessage('error', p),
      info: (p) => showMessage('info', p),
      warning: (p) => showMessage('warning', p),
      loading: (p) => showMessage('loading', p),
      dismiss: (key) => messageApi.destroy(key),
      clear: () => messageApi.destroy(),
    }),
    [showMessage, messageApi],
  );

  return (
    <MessageApiContext.Provider value={api}>
      {contextHolder}
      {children}
    </MessageApiContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageApiContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageApiProvider');
  }
  return context;
};
