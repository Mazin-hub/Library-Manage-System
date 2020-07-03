package com.Library.Service.Impl;

import com.Library.Dao.MyBooks.MyBookBackDao;
import com.Library.Dao.MyBooks.MyBooksTableDao;
import com.Library.Dao.MyBooks.UploadMyBookDao;
import com.Library.Service.MyBooksService;
import com.Library.domain.MyBooks;

import java.util.List;

public class MyBooksServiceImpl implements MyBooksService {
    MyBooksTableDao myBooksTableDao = new MyBooksTableDao();
    UploadMyBookDao uploadMyBookDao = new UploadMyBookDao();
    MyBookBackDao myBookBackDao = new MyBookBackDao();
    @Override
    public List<MyBooks> getMyBooksTableInformation() {
        return myBooksTableDao.getMyBooksTableInformation();
    }

    @Override
    public int uploadMyBook(String bookName, String author, String provider, String uploadDate) {
        return uploadMyBookDao.uploadMyBook(bookName,author,provider,uploadDate);
    }

    @Override
    public int MyBookBack(String bookId) {
        return myBookBackDao.MyBookBack(bookId);
    }
}
