import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useState } from 'react'

interface SwipeProps {
  title?: string
  name?: string[]
  author?: string[]
  publisher?: string[]
  pages?: string[]
}

interface BookState {
  read: boolean
  readComplete: boolean
  heartBlack: boolean
}

export default function Swipe({ title, name, author, publisher, pages }: SwipeProps) {
  const [activeBook, setActiveBook] = useState<number | null>(null)
  const [booksState, setBooksState] = useState<Record<number, BookState>>({})
  const currentBookState = booksState[activeBook!] || {
    read: false,
    readComplete: false,
    heartBlack: false,
  }

  const toggleAccordion = (index: number) => {
    if (activeBook === index) {
      setActiveBook(null)
    } else {
      setActiveBook(index)
    }
  }

  const toggleRead = () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: true, readComplete: false },
    })
  }

  const toggleReadComplete = () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: false, readComplete: true },
    })
  }

  const toggleHeartColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, heartBlack: !currentBookState.heartBlack },
    })
  }

  return (
    <Container>
      {title && <SwiperTitle>{title}</SwiperTitle>}
      <StyledSwiper
        slidesPerView={7}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: false,
        }}
        modules={[FreeMode, Pagination]}>
        {[...Array(14).keys()].map((index) => (
          <SwiperSlide key={index} onClick={() => toggleAccordion(index)}>
            <BookCover>
              {/* <img src={`path/to/book${index + 1}.jpg`}  /> */}
              <img src="https://i.postimg.cc/SNVct2d7/Book.png" alt={`Book ${index + 1}`} />
              <BookTextContainer>
                <BookName>{name && name[index]}</BookName>
                <BookAuthor>{author && author[index]}</BookAuthor>
              </BookTextContainer>
            </BookCover>
          </SwiperSlide>
        ))}
      </StyledSwiper>

      {activeBook !== null && (
        <AccordionContent>
          <hr />
          <BookDetails>
            <BookImageDetail
              // src={`path/to/book${activeBook + 1}.jpg`}
              src="https://i.postimg.cc/SNVct2d7/Book.png"
              alt={`Book ${activeBook + 1}`}
            />
            <BookInfo>
              <Info>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {name && name[activeBook]}
                  </h2>
                </div>

                <div style={{ display: 'flex' }}>
                  <p>{author && author[activeBook]}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{publisher && publisher[activeBook]}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{pages && pages[activeBook]}</p>
                </div>

                <div style={{ fontSize: '1.25rem', display: 'flex', fontWeight: 'bold' }}>
                  <StyledButton
                    active={currentBookState.read}
                    onClick={toggleRead}
                    style={{ marginRight: '1rem' }}>
                    읽기
                  </StyledButton>

                  <StyledButton active={currentBookState.readComplete} onClick={toggleReadComplete}>
                    다 읽은 책
                  </StyledButton>
                </div>
              </Info>

              {/* <Like> */}
              <HeartButton onClick={toggleHeartColor}>
                <img
                  style={{
                    width: '2rem',
                    height: '2rem',
                    marginTop: '0.5rem',
                    // marginLeft: '8rem',
                  }}
                  src={
                    currentBookState.heartBlack
                      ? 'https://i.postimg.cc/1XkRS36B/blackheart.png'
                      : 'https://i.postimg.cc/Z5jSxYp2/heart.png'
                  }
                  alt="heart"
                />
              </HeartButton>
              {/* <p>명이 좋아합니다.</p> */}
              {/* </Like> */}
            </BookInfo>
          </BookDetails>
        </AccordionContent>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
`

const SwiperTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 2rem;
  padding-bottom: 1rem;
`

const StyledSwiper = styled(Swiper)`
  padding-bottom: 2.5rem;
  .swiper-pagination-bullet {
    display: none;
  }
`

const AccordionContent = styled.div`
  background-color: #fff;
  padding: 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;
`

const BookDetails = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 3.25rem;
  padding-left: 3rem;
`

const BookImageDetail = styled.img`
  width: 36.25rem;
  height: 50.25rem;
  background-color: gray;
  margin-right: 1rem;
`

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  & > div {
    display: flex;
  }
`

const Info = styled.div`
  flex-direction: column;
  gap: 1rem;
`
const BookCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const BookTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0.5rem;
`

const BookName = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`

const BookAuthor = styled.h2`
  font-size: 1rem;
  color: gray;
`

// const Like = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.4rem;
//   align-items: flex-end;
//   margin-left: 20rem;
// `

const StyledButton = styled.button<{ active: boolean }>`
  color: ${({ active }) => (active ? '#BFC66A' : 'initial')};
  transition: color 0.3s ease;
  &:hover {
    color: #bfc66a;
  }
`

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 3rem;
  margin-left: auto;
`