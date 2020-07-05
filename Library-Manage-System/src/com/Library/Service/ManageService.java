package com.Library.Service;

import com.Library.domain.BorrowInformation;
import com.Library.domain.book;

import java.util.List;

public interface ManageService {
    public int checkIdentity(String userName, String password);

    public List<book> manageBooks();

    public int modify(String mbookName, String mauthor, String mgenre, String mpublish, String muploadDate, String bookId);

    public int delete(String bookId);

    public List<BorrowInformation> dealBorrow();

    public int passBorrow(String bookId, String userName);

    public int rejectBorrow(String bookId, String userName);

    public List<BorrowInformation> dealReturn();

    public int passReturn(String bookId, String userName);

    public List<BorrowInformation> dealDelay();

    public int passDelay(String bookId, String userName,String newReturnDate);

    public int rejectDelay(String bookId, String userName);

    public List<book> dealUpload();

    public int passUpload(String bookId);

    public int rejectUpload(String bookId);

}