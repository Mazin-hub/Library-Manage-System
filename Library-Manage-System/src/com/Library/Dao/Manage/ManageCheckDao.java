package com.Library.Dao.Manage;

import com.Library.Utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

public class ManageCheckDao {
    JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public int checkIdentity(String userName,String password){
        String sql = "SELECT EXISTS( SELECT * FROM USER WHERE userName = ? and password = ?)";
        Integer count = template.queryForObject(sql, Integer.class,userName,password);
        System.out.println(count);
        return count;
    }
}
