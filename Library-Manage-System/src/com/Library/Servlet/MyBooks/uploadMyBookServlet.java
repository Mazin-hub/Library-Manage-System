package com.Library.Servlet.MyBooks;

import com.Library.Service.Impl.MyBooksServiceImpl;
import com.Library.Service.MyBooksService;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/uploadMyBookServlet")
public class uploadMyBookServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String bookName = request.getParameter("bookName");
        String author = request.getParameter("author");
        String provider = request.getParameter("provider");
        String uploadDate = request.getParameter("uploadDate");
//        System.out.println(bookName);
//        System.out.println(author);
//        System.out.println(provider);
//        System.out.println(uploadDate);
        MyBooksService myBooksService = new MyBooksServiceImpl();
        int i = myBooksService.uploadMyBook(bookName, author, provider, uploadDate);
        Result result = new Result();
        if(i == 1){
            result.setMessage("分享成功");
        }else{
            result.setMessage("分享失败");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(result);
        response.getWriter().write(json);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
