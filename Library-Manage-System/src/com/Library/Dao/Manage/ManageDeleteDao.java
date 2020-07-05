package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageDeleteDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int delete(String bookId){
        String sql = "delete from book where bookId = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql, id);
        System.out.println("delete:" + count);
        return count;
    }
}
