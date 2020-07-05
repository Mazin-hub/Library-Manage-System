package com.Library.Service.Impl;

import com.Library.Dao.Manage.*;
import com.Library.Service.ManageService;
import com.Library.domain.BorrowInformation;
import com.Library.domain.book;

import java.util.List;

public class ManageServiceImpl implements ManageService {
    ManageModifyDao manageModifyDao = new ManageModifyDao();
    ManageDeleteDao manageDeleteDao = new ManageDeleteDao();
    ManageBooksDao manageBooksDao = new ManageBooksDao();
    ManageCheckDao manageCheckDao = new ManageCheckDao();
    ManageDealBorrowDao manageDealBorrowDao = new ManageDealBorrowDao();
    ManagePassBorrowDao managePassBorrowDao = new ManagePassBorrowDao();
    ManageRejectBorrowDao manageRejectBorrowDao = new ManageRejectBorrowDao();
    ManageDealReturnDao manageDealReturnDao = new ManageDealReturnDao();
    ManagePassReturnDao managePassReturnDao = new ManagePassReturnDao();
    ManageDealDelayDao manageDealDelayDao = new ManageDealDelayDao();
    ManagePassDelayDao managePassDelayDao = new ManagePassDelayDao();
    ManageRejectDelayDao manageRejectDelayDao = new ManageRejectDelayDao();
    ManageDealUploadDao manageDealUploadDao = new ManageDealUploadDao();
    ManagePassUploadDao managePassUploadDao = new ManagePassUploadDao();
    ManageRejectUploadDao manageRejectUploadDao = new ManageRejectUploadDao();
    @Override
    public int checkIdentity(String userName,String password) {
        return manageCheckDao.checkIdentity(userName,password);
    }

    @Override
    public List<book> manageBooks() {
        return manageBooksDao.manageBooks();
    }

    @Override
    public int modify(String mbookName, String mauthor, String mgenre, String mpublish, String muploadDate, String bookId) {
        return manageModifyDao.modify(mbookName,mauthor,mgenre,mpublish,muploadDate,bookId);
    }

    @Override
    public int delete(String bookId) {
        return manageDeleteDao.delete(bookId);
    }

    @Override
    public List<BorrowInformation> dealBorrow() {
        return manageDealBorrowDao.dealBorrow();
    }

    @Override
    public int passBorrow(String bookId,String userName) {
        return managePassBorrowDao.passBorrow(bookId,userName);
    }

    @Override
    public int rejectBorrow(String bookId, String userName) {
        return manageRejectBorrowDao.rejectBorrow(bookId,userName);
    }

    @Override
    public List<BorrowInformation> dealReturn() {
        return manageDealReturnDao.dealReturn();
    }

    @Override
    public int passReturn(String bookId, String userName) {
        return managePassReturnDao.passReturn(bookId,userName);
    }

    @Override
    public List<BorrowInformation> dealDelay() {
        return manageDealDelayDao.dealDelay();
    }

    @Override
    public int passDelay(String bookId, String userName,String newReturnDate) {
        return managePassDelayDao.passDelay(bookId,userName,newReturnDate);
    }

    @Override
    public int rejectDelay(String bookId, String userName) {
        return manageRejectDelayDao.rejectDelay(bookId,userName);
    }

    @Override
    public List<book> dealUpload() {
        return manageDealUploadDao.dealUpload();
    }

    @Override
    public int passUpload(String bookId) {
        return managePassUploadDao.passUpload(bookId);
    }

    @Override
    public int rejectUpload(String bookId) {
        return manageRejectUploadDao.rejectUpload(bookId);
    }
}
