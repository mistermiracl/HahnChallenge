package com.hahn.challenge;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    
    @RequestMapping("/greet")
    public String greeting() {
        return "Hey!";
    }

}
