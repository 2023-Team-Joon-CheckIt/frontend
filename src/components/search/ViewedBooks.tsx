// RecentlyViewedBooks.tsx
import React from 'react';
import Swipe from './swiper/Swipe';

interface Book {
    id: string | null;
    title: string;
    author: string;
    publisher: string;
    cover_image_url: string;
    pages: number;
    category: string;
}

interface ViewedBooksProps {
    onSwipeClick: (index: number) => void;
    active: boolean;
    books: Book[]; // 여기에 API로부터 받은 책 데이터를 넘겨줄 것입니다.
}

const ViewedBooks: React.FC<ViewedBooksProps> = ({ onSwipeClick, active, books }) => {
    return (
        <Swipe
            index={0}
            onSwipeClick={onSwipeClick}
            active={active}
            title="검색한 도서"
            name={books.map((book) => book.title)}
            author={books.map((book) => book.author)}
            publisher={books.map((book) => book.publisher)}
            pages={books.map((book) => book.pages.toString())}
        />
    );
}

export default ViewedBooks;
