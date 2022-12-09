package com.hahn.challenge.application.services;

import java.util.List;

import com.hahn.challenge.domain.entities.Country;

public interface CountryService {
    List<Country> findAll();
}
