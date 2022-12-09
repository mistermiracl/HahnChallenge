package com.hahn.challenge.domain.repositories;

import org.springframework.data.repository.ListCrudRepository;

import com.hahn.challenge.domain.entities.Country;

public interface CountryRepository extends ListCrudRepository<Country, Integer> {
}
