package com.Library.Service.Impl;

import com.Library.Dao.Search.SearchDao;
import com.Library.Dao.Search.confirmBorrowDao;
import com.Library.Service.SearchService;
import com.Library.domain.book;

import java.util.List;

public class SearchServiceImpl implements SearchService {
    private SearchDao searchDao = new SearchDao();
    private confirmBorrowDao confirmBorrowDao = new confirmBorrowDao();

    @Override
    public List<book> searchInformation(String[] info) throws Exception{
        // 获取基本的信息
        List<book> search = searchDao.search(info);
        // 在上面的基础上，添加总库存和现存数
        return getTotalAndNow(search);
    }

    @Override
    public List<book> getTotalAndNow(List<book> books) {
        return searchDao.getTotalAndNow(books);
    }

    @Override
    public int confirmBorrow(String bookName, String borrowDate, String returnDate) {
        System.out.println("Service");
        return confirmBorrowDao.confirmBorrow(bookName,borrowDate,returnDate);
    }
}
