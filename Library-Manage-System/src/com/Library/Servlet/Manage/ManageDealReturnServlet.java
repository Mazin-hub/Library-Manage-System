package com.Library.Servlet.Manage;

import com.Library.Service.Impl.ManageServiceImpl;
import com.Library.Service.ManageService;
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

@WebServlet("/ManageDealReturnServlet")
public class ManageDealReturnServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        ManageService manageService = new ManageServiceImpl();
        Result result = new Result();
        List<BorrowInformation> returnDeal = manageService.dealReturn();
        if(returnDeal.size() > 0){
            result.setMessage("请求归还处理成功");
            result.setData(returnDeal);
        }else{
            result.setMessage("无归还处理");
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
