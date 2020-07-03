package com.Library.Servlet.Borrow;

import com.Library.Service.BorrowService;
import com.Library.Service.Impl.BorrowServiceImpl;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.RescaleOp;
import java.io.IOException;

@WebServlet("/borrowReturnServlet")
public class borrowReturnServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String bookName = request.getParameter("bookName");
        String provider = request.getParameter("provider");
//        System.out.println(bookName);
//        System.out.println(provider);
        BorrowService borrowService = new BorrowServiceImpl();
        Result result = new Result();
        int i = borrowService.borrowReturn(bookName, provider);
        if(i == 1){
            result.setMessage("申请归还成功");
        }else{
            result.setMessage("申请归还失败");
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
