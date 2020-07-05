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

@WebServlet("/ManageModifyServlet")
public class ManageModifyServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=utf-8");
        String mbookName = request.getParameter("MbookName");
        String mauthor = request.getParameter("Mauthor");
        String mgenre = request.getParameter("Mgenre");
        String mpublish = request.getParameter("Mpublish");
        String muploadDate = request.getParameter("MuploadDate");
        String bookId = request.getParameter("bookId");
        System.out.println(mbookName);
        System.out.println(mauthor);
        System.out.println(mgenre);
        System.out.println(mpublish);
        System.out.println(muploadDate);
        System.out.println(bookId);
        ManageService manageService = new ManageServiceImpl();
        int i = manageService.modify(mbookName, mauthor, mgenre, mpublish, muploadDate, bookId);
        Result result = new Result();
        if(i == 1){
            result.setMessage("修改成功");
        }else{
            result.setMessage("修改失败");
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
