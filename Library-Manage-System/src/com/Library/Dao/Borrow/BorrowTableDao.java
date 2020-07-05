package com.Library.Dao.Borrow;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.BorrowInformation;
import com.Library.domain.bookNum;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class BorrowTableDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<BorrowInformation> getBorrowTableInformation(){
        // 根据后台 session 的 userName 查，这里测试用 “马志鹏”
        String sql = "select * from book,borrow where book.bookId = borrow.bookId and userName = ?";
        List<BorrowInformation> lists = template.query(sql, new BeanPropertyRowMapper<>(BorrowInformation.class),"马志鹏");
        String sql2 = "select * from bookNum where bookName = ?";
        for(BorrowInformation list : lists){
            bookNum bookNum = template.queryForObject(sql2, new BeanPropertyRowMapper<>(bookNum.class), list.getBookName());
            list.setTotal(bookNum.getTotal());
            list.setNow(bookNum.getNow());
        }
        return lists;
    }
}
