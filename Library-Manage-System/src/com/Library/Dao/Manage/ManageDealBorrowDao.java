package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.BorrowInformation;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ManageDealBorrowDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<BorrowInformation> dealBorrow(){
        String sql = "select book.bookId,bookName,author,provider,userName,borrowDate,returnDate from borrow,book where book.bookId = borrow.bookId and wstatus = 'borrow'";
        List<BorrowInformation> lists = template.query(sql, new BeanPropertyRowMapper<>(BorrowInformation.class));
        return lists;
    }
}
