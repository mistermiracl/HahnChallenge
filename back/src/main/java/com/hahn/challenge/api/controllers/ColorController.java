package com.hahn.challenge.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hahn.challenge.application.services.ColorService;
import com.hahn.challenge.api.models.responses.ColorResponse;

@RestController
@RequestMapping("/api/colors")
public class ColorController {

    private ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping
    public List<ColorResponse> index() {
        return colorService.findAll().stream().map(color -> ColorResponse.builder()
            .id(color.getId())
            .name(color.getName())
            .hex(color.getHex())
            .build()
        ).toList();
    }

}