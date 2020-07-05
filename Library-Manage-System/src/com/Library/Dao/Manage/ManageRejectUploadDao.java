package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageRejectUploadDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int rejectUpload(String bookId) {
        String sql = "delete from book where bookId = ?";
        int id = Integer.parseInt(bookId);
        int count = template.update(sql, id);
        System.out.println("驳回上传："+count);
        return count;
    }
}
