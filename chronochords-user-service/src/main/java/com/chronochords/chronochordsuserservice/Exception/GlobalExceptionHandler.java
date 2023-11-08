package com.chronochords.chronochordsuserservice.Exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(CustomException ex, WebRequest request) {
        log.error("CustomException thrown", ex);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", ex.getStatus().value());
        body.put("error", ex.getStatus().getReasonPhrase());

        // Check if the exception has a message, include it
        if (ex.getMessage() != null && !ex.getMessage().isEmpty()) {
            body.put("message", ex.getMessage());
        }

        // If the CustomException contains a map of errors, include it in the response
        if (ex.getErrors() != null && !ex.getErrors().isEmpty()) {
            body.put("errors", ex.getErrors());
        } else {
            // Fallback to a generic message if no detailed errors are available
            body.put("message", "An unexpected error occurred.");
        }

        return new ResponseEntity<>(body, ex.getStatus());
    }

    // Here's an example of how you might handle validation exceptions
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        // Log the error details for internal tracking
        ex.getBindingResult().getFieldErrors().forEach(fieldError ->
                log.error("Validation error - Field: '{}' Message: '{}'",
                        fieldError.getField(),
                        fieldError.getDefaultMessage()));

        // Create a map to hold the simplified error details
        Map<String, Object> errorDetails = new LinkedHashMap<>();
        errorDetails.put("timestamp", LocalDateTime.now());
        errorDetails.put("status", HttpStatus.BAD_REQUEST.value());
        errorDetails.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
        errorDetails.put("message", "Validation errors");

        // Collect only field errors
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.toList());

        errorDetails.put("errors", errors);

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    // You can add more exception handlers here
}
