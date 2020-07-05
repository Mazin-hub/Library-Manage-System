package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageModifyDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int modify(String mbookName,String mauthor,String mgenre,String mpublish,String muploadDate,String bookId){
        String sql = "update book set bookName = ?,author = ?,genre = ? where bookId = ?";
        String sql2 = "update book set publish = ?,uploadDate = ? where bookId = ?";
        int id = Integer.parseInt(bookId);
        int count1 = template.update(sql, mbookName, mauthor,mgenre,id);
        int count2 = template.update(sql2, mpublish, muploadDate, id);
        int count = (count1 == 1 && count2 == 1) ? 1 : 0;
        System.out.println("modify:" + count);
        return count;
    }
}

