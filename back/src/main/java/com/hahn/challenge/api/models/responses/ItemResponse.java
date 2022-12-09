package com.hahn.challenge.api.models.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private Integer id;
    private String name;
    private Integer quantity;
    private Boolean active;
    private Integer countryId;
    private Integer colorId;
    private CountryResponse country;
    private ColorResponse color;
}
