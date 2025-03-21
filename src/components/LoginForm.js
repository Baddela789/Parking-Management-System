import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8089/api/users/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data) {
        message.success("Login successful!"); 
      
        localStorage.setItem("user", JSON.stringify(response.data));
        
       
        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ width: 400, margin: "0 auto", padding: "20px" }}>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ email, password }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
