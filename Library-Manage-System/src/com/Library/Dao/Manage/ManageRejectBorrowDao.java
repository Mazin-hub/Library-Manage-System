package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageRejectBorrowDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int rejectBorrow(String bookId,String userName) {
        String sql = "delete from borrow where bookId = ? and userName = ? and wstatus = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql, id, userName, "borrow");
        System.out.println(count);
        return count;
    }
}
