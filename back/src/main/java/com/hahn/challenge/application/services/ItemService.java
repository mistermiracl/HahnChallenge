package com.hahn.challenge.application.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.hahn.challenge.domain.entities.Item;

public interface ItemService {
    Item save(Item item);
    void delete(Integer id);
    boolean patch(Integer id, Map<String, Object> item);
    Optional<Item> find(Integer id);
    List<Item> findAll();
}
