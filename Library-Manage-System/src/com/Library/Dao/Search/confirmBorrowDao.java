package com.Library.Dao.Search;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class confirmBorrowDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());
    public int confirmBorrow(String bookName,String borrowDate,String returnDate){
        System.out.println("Dao");
        String bookIdSql = "select bookId from book where bookName = ?";
        String insertSql = "insert into borrow(bookId,userName,borrowDate,returnDate,wstatus) values(?,?,?,?,?)";
        List<book> book = template.query(bookIdSql, new BeanPropertyRowMapper<>(book.class), bookName);
        Integer bookId = book.get(0).getBookId();
        // 1 代表成功，0 代表失败
        return template.update(insertSql, bookId, "马志鹏", borrowDate, returnDate, "borrow");
    }
}
