import React, { useContext } from 'react'
import { Row, Form, Input, Button } from 'antd'
import { UserContext } from '../../../contexts'

export const LoginPage: React.FC = () => {

  const { loginUser } = useContext(UserContext)

  const handleSubmit = ({email, password}: {email: string, password: string}) => {
    loginUser(email, password)
  }

  return (
    <Row justify="center" align="middle" style={{height: '100vh'}}>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  )
}
