package com.Library.Service;

import com.Library.domain.book;

import java.util.HashMap;
import java.util.List;

public interface SearchService {
    /**
     * 搜索信息
     * @return
     */
    public List<book> searchInformation(String[] info) throws Exception;

    public List<book> getTotalAndNow(List<book> books);

    public int confirmBorrow(String bookName,String borrowDate,String returnDate);
}
