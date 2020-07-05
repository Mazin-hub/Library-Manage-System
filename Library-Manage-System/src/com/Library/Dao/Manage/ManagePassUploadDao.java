package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManagePassUploadDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int passUpload(String bookId){
        String sql = "update book set status = ? where bookId = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql,"1",id);
        System.out.println("通过上传：" + count);
        return count;
    }
}
