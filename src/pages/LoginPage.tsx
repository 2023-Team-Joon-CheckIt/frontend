import React from 'react'
import styled from 'styled-components'
import LoginInput from '../components/Input/LoginInput'
import { useState } from 'react'
import StartNavigator from '../components/main/StartNavigator'
import LoginHeader from '../components/Header/LoginHeader'
import { Link, useNavigate } from 'react-router-dom'

import Bar1 from '../../public/img/Bar1.png'
import Bar2 from '../../public/img/Bar2.png'
import Bar3 from '../../public/img/Bar3.png'
import { baseInstance } from '../api/config'
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (id && pw) {
      try {
        const response = await baseInstance.post('/users/login', {
          username: id,
          password: pw,
        })
        if (response.data.code === 'U004') {
          localStorage.setItem('accessToken', response.data.data.accessToken)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          console.log('로그인 잘됨')
          navigate('/booksearch')
          Swal.fire({
            title: "로그인 성공!",
            icon: "success"
          });
        } else if (response.data.businessCode === 'U002') {
          // 사용자가 없을 때
          console.log('에러 내용: ', response.data.message)
          alert(response.data.message)
        } else if (response.data.code === 'U001') {
          // 비밀번호가 틀렸을 때
          console.log('에러 내용: ', response.data.message)
          alert('비밀번호가 틀렸습니다.')
        }
      } catch (error) {
        // 에러 처리
        Swal.fire({
          title: "로그인 실패!",
          icon: "error"
        });
      }
    }
  }

  // 아이디, 비밀번호
  const [id, setId] = useState<string>('')
  const [pw, setPw] = useState<string>('')

  const idInputRef = React.useRef<HTMLInputElement>(null)
  const pwInputRef = React.useRef<HTMLInputElement>(null)

  const handleIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 여기에 다음 input의 ref를 사용하여 포커스 이동
      pwInputRef.current?.focus()
    }
  }

  const handlePwKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 모든 입력이 완료되면 '시작하기' 버튼의 동작을 수행
      handleLogin()
    }
  }

  return (
    <LoginContainer>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <Container>
          <TitleContainer>
            <Title>책 잇</Title>
            <TextContainer>
              <Text style={{ fontSize: '1.45rem' }}>당신의 책을 함께 기억해요</Text>
              <Text style={{ fontSize: '1.13rem' }}>remember your book together</Text>
            </TextContainer>
          </TitleContainer>

          <form>
            <LoginInput
              title="Username"
              placeholder=""
              value={id}
              type="id"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
              onKeyPress={handleIdKeyPress}
              ref={idInputRef} // 아이디 입력 필드에 대한 ref를 전달합니다.
            />
            <LoginInput
              title="Password"
              placeholder=""
              value={pw}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
              onKeyPress={handlePwKeyPress}
              ref={pwInputRef} // 비밀번호 입력 필드에 대한 ref를 전달합니다.
            />
          </form>
          <SignupLayout>
            <SignupText>계정이 없으신가요?</SignupText>
            <Link to="/signup">
              <StyledButton>회원가입</StyledButton>
            </Link>
          </SignupLayout>
        </Container>
        <ImgContainer>
          <Bar1Image src={Bar1} alt="Bar1" />
          <Bar2Image src={Bar2} alt="Bar2" />
          <Bar3Image src={Bar3} alt="Bar3" />
        </ImgContainer>
      </div>

      <StartNavigator onClick={handleLogin} disabled={!id || !pw} />
    </LoginContainer>
  )
}
const LoginContainer = styled.div`
  overflow: hidden;
  max-height: 100vh;
`
const Container = styled.div`
  margin-left: 14rem;
  margin-top: 8.23rem;
`

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 2.2rem;
`
const Title = styled.h1`
  color: #000;
  text-align: center;
  /* font-family: BM Jua; */
  font-family: bmfont;
  font-size: 7.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Text = styled.h2`
  color: #000;
  font-family: bmfont;

  font-style: normal;
  font-weight: 400;
  /* line-height: 3.75rem; */
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-left: 1.1rem;
`

const SignupLayout = styled.div`
  display: flex;
  margin-left: 6.5rem;
  align-items: center;
`

const SignupText = styled.h2`
  color: #000;
  text-align: center;
  font-family: Noto Sans;
  font-size: 1.05rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-right: 1rem;
`
const StyledButton = styled.button`
  color: #b2b2b2;
  font-family: Noto Sans;
  font-size: 1.05rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`

const ImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 17rem;
  margin-left: 21.5rem;
  position: relative;
`

const Bar1Image = styled.img`
  width: 22rem;
  height: 32rem;
  position: absolute;
  right: calc(100% - 89px);
  z-index: 1;
`

const Bar2Image = styled.img`
  width: 17rem;
  height: 33.3rem;
`

const Bar3Image = styled.img`
  width: 10.3rem;
  height: 36rem;
`
