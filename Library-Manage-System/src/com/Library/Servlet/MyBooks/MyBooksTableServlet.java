package com.Library.Servlet.MyBooks;

import com.Library.Service.Impl.MyBooksServiceImpl;
import com.Library.Service.MyBooksService;
import com.Library.domain.MyBooks;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.geom.RectangularShape;
import java.io.IOException;
import java.util.List;

@WebServlet("/MyBooksTableServlet")
public class MyBooksTableServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        MyBooksService myBooksService = new MyBooksServiceImpl();
        List<MyBooks> information = myBooksService.getMyBooksTableInformation();
        Result result = new Result();
        if(information.size() > 0){
            result.setMessage("请求图书成功");
            result.setData(information);
        }else{
            result.setMessage("请求图书失败");
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
