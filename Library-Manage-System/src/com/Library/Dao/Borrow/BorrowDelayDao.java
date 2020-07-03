package com.Library.Dao.Borrow;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class BorrowDelayDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());
    public int borrowDelay(String bookName,String provider,String newReturnDate){
        String sql = "select bookId from book where bookName = ? and provider = ?";
        String updateSql = "update borrow set request = ? where bookId = ?";
        book object = template.queryForObject(sql, new BeanPropertyRowMapper<>(book.class), bookName, provider);
        int id = object.getBookId();
        int count = template.update(updateSql,newReturnDate, id);
        return count;
    }
}
