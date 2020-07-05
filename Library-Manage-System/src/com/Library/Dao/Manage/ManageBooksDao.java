package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ManageBooksDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<book> manageBooks(){
        String sql = "select * from book";
        List<book> manageBooks = template.query(sql, new BeanPropertyRowMapper<>(book.class));
        System.out.println(manageBooks.size());
        return manageBooks;
    }
}
