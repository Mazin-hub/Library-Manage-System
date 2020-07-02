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
import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;

@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json;charset=UTF-8");
        String bookName = request.getParameter("bookName") == "" ? "1": request.getParameter("bookName");
        String author = request.getParameter("author") == "" ? "1": request.getParameter("author");
        String genre = request.getParameter("genre");
        String publish = request.getParameter("publish") == "" ? "1": request.getParameter("publish");
        if("请选择".equals(genre)){
            genre = "1";
        }
//        System.out.println(bookName);
//        System.out.println(author);
//        System.out.println(genre);
//        System.out.println(publish);
        String[] info = new String[4];
        info[0] = bookName;
        info[1] = author;
        info[2] = genre;
        info[3] = publish;
        SearchService searchService = new SearchServiceImpl();
        Result result = new Result();
        try {
            result.setData(searchService.searchInformation(info));
            result.setMessage("搜索成功");
        } catch (Exception e) {
            e.printStackTrace();
        }
        ObjectMapper mapper = new ObjectMapper();
        String searhInformation = mapper.writeValueAsString(result);
        response.getWriter().write(searhInformation);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
