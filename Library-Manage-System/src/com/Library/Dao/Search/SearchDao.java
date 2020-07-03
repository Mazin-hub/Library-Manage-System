package com.Library.Dao.Search;

import com.Library.Utils.JDBCUtils;
import com.Library.domain.book;
import com.Library.domain.bookNum;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SearchDao {
    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    public List<book> search(String[] info) throws Exception {
        String sql = "select * from book where status <> -1 ";
        StringBuilder sb= new StringBuilder(sql);
        if(info[0] != "1"){
            sb.append("and bookName = '" + info[0] + "' ");
        }
        if(info[1] != "1"){
            sb.append("and author = '" + info[1] + "' ");
        }
        if(info[2] != "1"){
            sb.append("and genre = '" + info[2] + "' ");
        }
        if(info[3] != "1"){
            sb.append("and publish = '" + info[3] + "' ");
        }
        List<book> books = template.query(sb.toString(), new BeanPropertyRowMapper<book>(book.class));

        return books;
    }

    /**
     * 没有保存在bookNum表中，就查询book表 插入数据， 其他情况直接根据 bookName查询 bookNum 表
     * @param books
     * @return
     */
    public List<book> getTotalAndNow(List<book> books){
        String sql = "select count(*) from book where status <> -1 ";
        String countSql = "select count(*) from booknum where bookName = ?";
        String getSql = "select * from booknum where bookName = ?";
        String insertSql = "insert into booknum(bookName,total,now) values(?,?,?)";
        String updateSql = "update booknum set total = ? , now = ? where bookName = ?";

        StringBuilder sb = new StringBuilder(sql);
        for(book book : books){
            // 1. 先查询 bookNum 表中是否有对应元组 ; 有则直接 拿出 ，无则查询book 再插入
            Long count = template.queryForObject(countSql,Long.class, book.getBookName());
            // 2. 查出现在最新的状态，更新记录 ？
            // 2.1 排除掉正在上传的书籍，得到总库存
            sb.append("and bookName = '" + book.getBookName() + "' ");
            Long total = template.queryForObject(sb.toString(),Long.class);

            // 2.2 还未被借 的 书籍 状态为 1 , 排除 -1 和 0 的元组 , 得到现存
            sb.append("and status <> 0 ");
            Long now = template.queryForObject(sb.toString(),Long.class);

            sb.delete(0,sb.length());
            sb.append(sql);

            if(count != 0){
                // bookNum 表中 有 对应记录
                /*  这里显得傻逼，是因为，更新在什么时候进行的问题还没考虑清楚  */
                // 先更新
                int c = template.update(updateSql, total, now, book.getBookName());
                System.out.println(c);
                // 再查询
//                bookNum booknum = template.queryForObject(getSql, new BeanPropertyRowMapper<>(bookNum.class), book.getBookName());
                book.setTotal(total);
                book.setNow(now);
                continue;
            }else{
                // 表中没有对应记录,查询，插入
                template.update(insertSql,book.getBookName(),total,now);
            }
        }

        return books;
    }
}
