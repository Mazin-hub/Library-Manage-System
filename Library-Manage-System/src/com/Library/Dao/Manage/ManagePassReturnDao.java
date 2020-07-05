package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManagePassReturnDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int passReturn(String bookId,String userName){
        String sql = "update borrow set wstatus = ?,request = '0' where bookId = ? and userName = ? and wstatus = ?";
        int id = Integer.parseInt(bookId);
        int count1 = template.update(sql, "0", id, userName,"return");
        String sql2 = "update book set status = ? where bookId = ?";
        int count2 = template.update(sql2,"1", id);
        int count = (count1 == 1 && count2 == 1) ? 1 : 0;
        System.out.println(count);
        return count;
    }
}
