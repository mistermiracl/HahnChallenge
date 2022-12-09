package com.hahn.challenge.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hahn.challenge.application.services.ColorService;
import com.hahn.challenge.domain.entities.Color;
import com.hahn.challenge.domain.repositories.ColorRepository;

@Service
public class ColorServiceImpl implements ColorService {
    
    private ColorRepository colorRepository;

    public ColorServiceImpl(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

}
