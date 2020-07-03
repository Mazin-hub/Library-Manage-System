package com.Library.Service;

import com.Library.domain.MyBooks;

import java.util.List;

public interface MyBooksService {
    public List<MyBooks> getMyBooksTableInformation();

    public int uploadMyBook(String bookName,String author,String provider,String uploadDate);

    public int MyBookBack(String bookId);
}
