package com.Library.Service.Impl;

import com.Library.Dao.Borrow.BorrowDelayDao;
import com.Library.Dao.Borrow.BorrowReturnDao;
import com.Library.Dao.Borrow.BorrowTableDao;
import com.Library.Service.BorrowService;
import com.Library.domain.BorrowInformation;

import java.util.List;

public class BorrowServiceImpl implements BorrowService {

    BorrowTableDao borrowTableDao = new BorrowTableDao();
    BorrowDelayDao borrowDelayDao = new BorrowDelayDao();
    BorrowReturnDao borrowReturnDao = new BorrowReturnDao();
    @Override
    public List<BorrowInformation> getBorrowTableInformation() {
        return borrowTableDao.getBorrowTableInformation();
    }

    @Override
    public int borrowDelay(String bookName, String provider, String newReturnDate) {
        return borrowDelayDao.borrowDelay(bookName,provider,newReturnDate);
    }

    @Override
    public int borrowReturn(String bookName, String provider) {
        return borrowReturnDao.borrowReturn(bookName,provider);
    }
}
