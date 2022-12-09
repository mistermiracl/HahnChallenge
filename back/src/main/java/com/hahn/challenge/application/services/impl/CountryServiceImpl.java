package com.hahn.challenge.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hahn.challenge.application.services.CountryService;
import com.hahn.challenge.domain.entities.Country;
import com.hahn.challenge.domain.repositories.CountryRepository;

@Service
public class CountryServiceImpl implements CountryService {

    private CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }
    
}
