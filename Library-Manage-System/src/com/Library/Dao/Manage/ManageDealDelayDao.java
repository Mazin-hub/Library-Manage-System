package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.BorrowInformation;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ManageDealDelayDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<BorrowInformation> dealDelay(){
        String sql = "select book.bookId,bookName,author,provider,userName,borrowDate,returnDate,request from borrow,book where book.bookId = borrow.bookId and request <> '0'";
        List<BorrowInformation> lists = template.query(sql, new BeanPropertyRowMapper<>(BorrowInformation.class));
        System.out.println("处理延期：" + lists.size());
        return lists;
    }
}
