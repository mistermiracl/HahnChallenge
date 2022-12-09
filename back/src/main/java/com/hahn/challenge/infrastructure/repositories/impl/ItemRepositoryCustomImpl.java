package com.hahn.challenge.infrastructure.repositories.impl;

import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hahn.challenge.domain.entities.Item;
import com.hahn.challenge.domain.repositories.ItemRepositoryCustom;

@Component("itemRepositoryImpl")
public class ItemRepositoryCustomImpl implements ItemRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public boolean patch(Integer id, Map<String, Object> item) {
        var criteriaBuilder = entityManager.getCriteriaBuilder();
        var itemCriteriaUpdate = criteriaBuilder.createCriteriaUpdate(Item.class);
        var itemRoot = itemCriteriaUpdate.from(Item.class);
        for(var entry : item.entrySet()) {
            itemCriteriaUpdate.set(itemRoot.get(entry.getKey()), entry.getValue());
        }
        itemCriteriaUpdate.where(criteriaBuilder.equal(itemRoot.get("id"), id));
        return entityManager.createQuery(itemCriteriaUpdate).executeUpdate() == 1;
    }

}
