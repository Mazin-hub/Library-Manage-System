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
import java.awt.image.RescaleOp;
import java.io.IOException;

@WebServlet("/ManageDeleteServlet")
public class ManageDeleteServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String bookId = request.getParameter("bookId");
        System.out.println(bookId);
        ManageService manageService = new ManageServiceImpl();
        int i = manageService.delete(bookId);
        Result result = new Result();
        if(i == 1){
            result.setMessage("删除成功");
        }else{
            result.setMessage("删除失败");
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
