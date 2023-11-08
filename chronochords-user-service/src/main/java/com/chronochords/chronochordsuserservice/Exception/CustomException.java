package com.chronochords.chronochordsuserservice.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ResponseStatus
public class CustomException extends RuntimeException {
    private final HttpStatus status;
    private final Map<String, String> errors; // Field to hold the errors

    public CustomException(Map<String, String> errors, HttpStatus status) {
        super("Multiple validation errors");
        this.errors = errors;
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public Map<String, String> getErrors() { return errors; }
}
