package com.hahn.challenge.api.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class IndexController {
    
    @GetMapping
    public Map<String, Object> index() {
        return Map.of("message", "welcome");
    }

}
