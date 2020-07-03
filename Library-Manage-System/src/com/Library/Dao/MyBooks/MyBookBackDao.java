package com.Library.Dao.MyBooks;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class MyBookBackDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int MyBookBack(String bookId){
        String sql = "update book set recall = ? where bookId = ?";
        int count = template.update(sql, 1, bookId);
        System.out.println(count);
        return count;
    }
}
