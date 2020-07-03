package com.Library.Dao.MyBooks;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class UploadMyBookDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int uploadMyBook(String bookName, String author, String provider, String uploadDate){
        String sql = "insert into book(bookName,author,provider,uploadDate,status) values(?,?,?,?,?)";
        int count = template.update(sql, bookName, author, provider, uploadDate, "-1");
        System.out.println(count);
        return count;
    }
}
