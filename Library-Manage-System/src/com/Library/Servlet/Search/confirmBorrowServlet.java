package com.Library.Servlet.Search;

import com.Library.Service.Impl.SearchServiceImpl;
import com.Library.Service.SearchService;
import com.Library.domain.Result;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Service;
import java.io.IOException;

@WebServlet("/confirmBorrowServlet")
public class confirmBorrowServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String bookName = request.getParameter("bookName");
        String borrowDate = request.getParameter("borrowDate");
        String returnDate = request.getParameter("returnDate");
        SearchService searchService = new SearchServiceImpl();
        int count = searchService.confirmBorrow(bookName, borrowDate, returnDate);
        Result result = new Result();
        if(count == 1) {
            result.setMessage("申请成功");
        }else{
            result.setMessage("申请失败");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String confirmBorrow = objectMapper.writeValueAsString(result);
        response.getWriter().write(confirmBorrow);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
