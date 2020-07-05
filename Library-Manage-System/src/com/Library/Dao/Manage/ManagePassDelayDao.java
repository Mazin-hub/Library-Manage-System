package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManagePassDelayDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int passDelay(String bookId,String userName,String newReturnDate){
        String sql = "update borrow set returnDate = ?,request = '0' where bookId = ? and userName = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql, newReturnDate, id, userName);
        System.out.println(count);
        return count;
    }
}
