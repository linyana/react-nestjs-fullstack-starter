import { Button, Form, Input, Typography, Flex } from 'antd';
import { useLogin } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useGlobal, useMobile } from '@/hooks';
import type { ILoginRequestType } from '@projectname/shared';

const { Title, Text } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const { actions } = useGlobal();
  const mobile = useMobile();

  const [form] = Form.useForm();

  const { fetchData, loading } = useLogin({
    showLoading: true,
    success: {
      message: null,
      action: ({ data }) => {
        if (data) {
          actions.set({ token: data.accessToken });
          navigate('/dashboard');
        }
      },
    },
  });

  const handleSubmit = async (values: ILoginRequestType) => {
    fetchData({
      data: {
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <Flex vertical align="center" gap="large" style={{ width: mobile ? '100%' : '50%' }}>
      <div style={{ textAlign: 'center' }}>
        <Title level={2}>Login to your account</Title>
        <Text type="secondary">Enter your email below to login to your account</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: '100%' }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            {
              type: 'email',
              message: 'Invalid email address',
            },
          ]}
        >
          <Input placeholder="m@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password onPressEnter={() => form.submit()} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
