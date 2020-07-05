package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.BorrowInformation;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ManageDealReturnDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<BorrowInformation> dealReturn(){
        String sql = "select book.bookId,bookName,author,provider,userName,borrowDate,returnDate from borrow,book where book.bookId = borrow.bookId and wstatus = 'return'";
        List<BorrowInformation> lists = template.query(sql, new BeanPropertyRowMapper<>(BorrowInformation.class));
        System.out.println(lists.size());
        return lists;
    }
}
