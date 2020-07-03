package com.Library.Test;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.MyBooks;
import com.Library.domain.book;
import com.Library.domain.bookNum;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JDBC {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());
    @Test
    public void test1(){
        String sql = "update book set status = 0 where bookId = 1";
        int count = template.update(sql);
        System.out.println(count);
    }

    @Test
    public void test2(){
        String sql = "select * from book";
        List<Map<String, Object>> list = template.queryForList(sql);
        for(Map<String, Object> map : list){
            System.out.println(map);
            System.out.println(map.get("bookName"));
        }
    }

    @Test
    public void test3(){
        String sql = "select * from book";
        List<book> list = template.query(sql, new BeanPropertyRowMapper<>(book.class));
        for(book map : list){
            System.out.println(map);
            System.out.println(map.getBookName());
        }
    }

    @Test
    public void test4() throws JsonProcessingException {
        String[] info = new String[4];
        info[0] = "爱";
        info[1] = "马志鹏";
        info[2] = "1";
        info[3] = "1";
        String sql = "select * from book";
        List<book> books = template.query(sql, new BeanPropertyRowMapper<book>(book.class));
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(books);
        System.out.println(json);
    }

    @Test
    public void test5(){
        String sql2 = "select count(*) from booknum where bookName = ?";
        Long aLong = template.queryForObject(sql2,Long.class, "无");
        System.out.println(aLong);
    }

    @Test
    public void test6(){
        String sql2 = "update book set status = 1 where bookId = 3";
        int count = template.update(sql2);
        System.out.println(count);
    }

    @Test
    public void test7() throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        String sql = "select bookId,bookName,author,uploadDate,status,back from book where provider = ?";
//        String selectSql = "select userName,borrowDate,returnDate from borrow where bookId = ?";
//        List<MyBooks> all = template.query(sql, new BeanPropertyRowMapper<>(MyBooks.class), "马志鹏");
//        String jsonAll = objectMapper.writeValueAsString(all);
//        System.out.println(jsonAll);
//        System.out.println("----------jsonAll------------");
//        List<MyBooks> finalList = new ArrayList<>();
//        for (MyBooks mybook : all) {
//            if("0".equals(mybook.getStatus())){
//                MyBooks my = template.queryForObject(selectSql, new BeanPropertyRowMapper<>(MyBooks.class), mybook.getBookId());
//                // 把 被 借 的 书籍，搜索出对应的borrow人，设置在原来的全部书籍中
//                mybook.setUserName(my.getUserName());
//                mybook.setBorrowDate(my.getBorrowDate());
//                mybook.setReturnDate(my.getReturnDate());
//                finalList.add(mybook);
//            }else{
//                finalList.add(mybook);
//            }
//        }
//        String json = objectMapper.writeValueAsString(finalList);
//        System.out.println(json);
    }


}
