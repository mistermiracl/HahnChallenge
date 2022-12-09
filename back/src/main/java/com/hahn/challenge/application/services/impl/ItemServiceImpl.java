package com.hahn.challenge.application.services.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hahn.challenge.domain.entities.Item;
import com.hahn.challenge.domain.repositories.ItemRepository;
import com.hahn.challenge.application.services.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item save(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public void delete(Integer id) {
        itemRepository.deleteById(id);
    }

    @Override
    public boolean patch(Integer id, Map<String, Object> item) {
        return itemRepository.patch(id, item);
    }

    @Override
    public Optional<Item> find(Integer id) {
        return itemRepository.findById(id);
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }
    
}
