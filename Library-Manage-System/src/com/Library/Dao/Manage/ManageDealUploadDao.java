package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.BorrowInformation;
import com.Library.domain.book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ManageDealUploadDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<book> dealUpload(){
        String sql = "select bookId,bookName,author,provider,uploadDate from book where status = '-1'";
        List<book> lists = template.query(sql, new BeanPropertyRowMapper<>(book.class));
        System.out.println("处理上传：" + lists.size());
        return lists;
    }
}
