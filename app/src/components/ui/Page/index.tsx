import { useNavigate } from 'react-router-dom';
import { Button, type FlexProps, Typography, Flex } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

type IPropsType = {
  backTo?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  contentProps?: FlexProps | null;
};

const { Title } = Typography;

export const Page = ({
  backTo,
  children,
  title,
  actions,
  contentProps = {
    vertical: true,
    gap: 'middle',
  },
}: IPropsType) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        style={{
          marginBottom: 16,
        }}
        justify="space-between"
        align="center"
      >
        <Flex gap="8px" align="center">
          {backTo && (
            <Button
              type="text"
              onClick={() => {
                navigate(backTo);
              }}
              style={{
                marginTop: 4,
              }}
              icon={<LeftOutlined />}
            />
          )}
          {title && (
            <Title
              level={3}
              style={{
                margin: 0,
                minWidth: 80,
              }}
            >
              {title}
            </Title>
          )}
        </Flex>
        <Flex gap="16px">{actions}</Flex>
      </Flex>
      {contentProps ? <Flex {...contentProps}>{children}</Flex> : <>{children}</>}
    </>
  );
};
