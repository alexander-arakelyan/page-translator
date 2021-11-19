package org.bambrikii.lang.pagetranslator.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class RequestUtils {
    private RequestUtils() {
    }

    public static Sort toSort(String sortBy) {
        String[] sortByArr = sortBy.split(" ");
        Sort.Direction direction = Sort.Direction.fromString(sortByArr.length > 1 ? sortByArr[1] : "DESC");
        String sortByField = sortByArr[0];
        Sort sort = Sort.by(direction, sortByField);
        return sort;
    }

    public static PageRequest toPager(Integer pageNum, Integer pageSize, Sort sort) {
        return PageRequest.of(pageNum, pageSize, sort);
    }

    public static PageRequest toPager(Integer pageNum, Integer pageSize, String sortBy) {
        return PageRequest.of(pageNum, pageSize, toSort(sortBy));
    }
}
