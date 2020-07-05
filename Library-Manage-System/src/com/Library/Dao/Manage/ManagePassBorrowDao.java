package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManagePassBorrowDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int passBorrow(String bookId,String userName){
        String sql = "update borrow set wstatus = ? where bookId = ? and userName = ? and wstatus = ?";
        int id = Integer.parseInt(bookId);
        System.out.println(id);
        int count1 = template.update(sql, "1", id, userName,"borrow");
        String sql2 = "update book set status = ? where bookId = ?";
        int count2 = template.update(sql2,"0", id);
        int count = (count1 == 1 && count2 == 1) ? 1 : 0;
        System.out.println(count);
        return count;
    }
}
