package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageRejectDelayDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int rejectDelay(String bookId,String userName) {
        String sql = "update borrow set wstatus = 'fail',request = '0' where bookId = ? and userName = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql, id, userName);
        System.out.println("驳回延期："+count);
        return count;
    }
}
