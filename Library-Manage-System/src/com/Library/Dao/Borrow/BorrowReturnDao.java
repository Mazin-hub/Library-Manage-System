package com.Library.Dao.Borrow;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class BorrowReturnDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int borrowReturn(String bookName, String provider){
        String sql = "select bookId from book where bookName = ? and provider = ?";
        String updateSql = "update borrow set wstatus = ? where bookId = ?";
        book object = template.queryForObject(sql, new BeanPropertyRowMapper<>(book.class), bookName, provider);
        int count = template.update(updateSql,"return",object.getBookId());
        System.out.println(count);
        return count;
    }
}
