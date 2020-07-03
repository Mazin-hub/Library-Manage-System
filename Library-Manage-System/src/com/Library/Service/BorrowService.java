package com.Library.Service;

import com.Library.domain.BorrowInformation;

import java.util.List;

public interface BorrowService {
    public List<BorrowInformation> getBorrowTableInformation();

    public int borrowDelay(String bookName,String provider,String newReturnDate);

    public int borrowReturn(String bookName,String provider);
}
