package com.Library.Servlet.Manage;

import com.Library.Service.Impl.ManageServiceImpl;
import com.Library.Service.ManageService;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ManageRejectBorrowServlet")
public class ManageRejectBorrowServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String bookId = request.getParameter("bookId");
        String userName = request.getParameter("userName");
        System.out.println(bookId);
        System.out.println(userName);
        ManageService manageService = new ManageServiceImpl();
        Result result = new Result();
        int i = manageService.rejectBorrow(bookId, userName);
        if(i == 1){
            result.setMessage("驳回借阅请求成功");
        }else{
            result.setMessage("驳回借阅请求失败");
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
