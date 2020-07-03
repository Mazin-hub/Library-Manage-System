package com.Library.Servlet.Borrow;

import com.Library.Service.BorrowService;
import com.Library.Service.Impl.BorrowServiceImpl;
import com.Library.domain.BorrowInformation;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/borrowTableServlet")
public class borrowTableServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        BorrowService borrowService = new BorrowServiceImpl();
        List<BorrowInformation> information = borrowService.getBorrowTableInformation();
        Result result = new Result();
        if(information.size() != 0){
            result.setMessage("我的借阅ajax成功");
            result.setData(information);
        }else{
            result.setData("我没有借阅");
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
