package com.hahn.challenge.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hahn.challenge.application.services.CountryService;
import com.hahn.challenge.api.models.responses.CountryResponse;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    
    private CountryService countryService;
    
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<CountryResponse> index() {
        return countryService.findAll().stream().map(country -> CountryResponse.builder()
            .id(country.getId())
            .name(country.getName())
            .build()
        ).toList();
    }

}
