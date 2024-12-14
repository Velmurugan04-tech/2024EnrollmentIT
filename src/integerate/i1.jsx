import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { FaUserTie, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #e0e1dd;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  //box-shadow: 0 0 40px 5px #c69874;
  
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: #e0e1dd;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 100%;
  
`;

const DepartmentLabel = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ff4d4d;
  text-align: left;
  letter-spacing: 2px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 15px;
  font-family: courier;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #ff4d4d;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1.5px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.primary ? "#ff4d4d" : "#000000")};
  border: none;
  border-radius: 12px;
  width: 100%;
  max-width: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => (props.primary ? "#cc3d3d" : "#333333")};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Icon = styled.span`
  font-size: 20px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff4d4d;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  color: #999;
  font-size: 14px;
  text-align: center;
`;

const RedesignedLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2000);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <LeftSection>
          <DepartmentLabel>Department of Information Technology</DepartmentLabel>
        </LeftSection>

        <RightSection>
          <Title>Enrollment System</Title>
          <Button onClick={() => handleLogin("/admin-login")} primary>
            <Icon>
              <FaUserTie />
            </Icon>
            Admin Login
          </Button>
          <Button onClick={() => handleLogin("/staff-login")}>
            <Icon>
              <FaChalkboardTeacher />
            </Icon>
            Staff Login
          </Button>
          <Button onClick={() => handleLogin("/student-login")} primary>
            <Icon>
              <FaUserGraduate />
            </Icon>
            Student Login
          </Button>
          {loading && <LoadingSpinner />}
        </RightSection>
      </Wrapper>

      {loading && <div>Loading...</div>}
      <Footer>&copy; 2024 Anna University, Chennai</Footer>
    </>
  );
};

export default RedesignedLayout;
