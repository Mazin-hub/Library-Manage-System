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

@WebServlet("/MyBookBackServlet")
public class MyBookBackServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String bookId = request.getParameter("bookId");
        MyBooksService myBooksService = new MyBooksServiceImpl();
        int i = myBooksService.MyBookBack(bookId);
        Result result = new Result();
        if(i == 1){
            result.setMessage("请求撤回成功");
        }else{
            result.setMessage("请求撤回失败");
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
