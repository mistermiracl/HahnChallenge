package com.hahn.challenge.domain.repositories;

import java.util.Map;

public interface ItemRepositoryCustom {
    boolean patch(Integer id, Map<String, Object> item);
}
