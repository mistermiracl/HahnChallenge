package com.hahn.challenge.domain.repositories;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Component;

import com.hahn.challenge.domain.entities.Item;

@Component("itemRepository")
public interface ItemRepository extends ListCrudRepository<Item, Integer>, ItemRepositoryCustom {
}
