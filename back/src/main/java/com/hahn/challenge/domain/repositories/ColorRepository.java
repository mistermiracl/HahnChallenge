package com.hahn.challenge.domain.repositories;

import org.springframework.data.repository.ListCrudRepository;

import com.hahn.challenge.domain.entities.Color;

public interface ColorRepository extends ListCrudRepository<Color, Integer> {
}
