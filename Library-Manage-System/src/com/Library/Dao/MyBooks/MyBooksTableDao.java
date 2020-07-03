package com.Library.Dao.MyBooks;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.MyBooks;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class MyBooksTableDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<MyBooks> getMyBooksTableInformation(){
        // sql 条件 语句 where条件provider为当前登录的用户名,测试默认用“马志鹏”
        String sql = "select bookId,bookName,author,uploadDate,status,recall from book where provider = ?";
        String selectSql = "select userName,borrowDate,returnDate from borrow where bookId = ?";
        List<MyBooks> all = template.query(sql, new BeanPropertyRowMapper<>(MyBooks.class), "马志鹏");
        List<MyBooks> finalList = new ArrayList<>();
        for (MyBooks mybook : all) {
            if("0".equals(mybook.getStatus())){
                MyBooks my = template.queryForObject(selectSql, new BeanPropertyRowMapper<>(MyBooks.class), mybook.getBookId());
                // 把 被 借 的 书籍，搜索出对应的borrow人，设置在原来的全部书籍中
                mybook.setUserName(my.getUserName());
                mybook.setBorrowDate(my.getBorrowDate());
                mybook.setReturnDate(my.getReturnDate());
                finalList.add(mybook);
            }else{
                finalList.add(mybook);
            }
        }
        return finalList;
    }

}
