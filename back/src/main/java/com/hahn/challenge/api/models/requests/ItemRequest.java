package com.hahn.challenge.api.models.requests;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequest {
    @NotBlank
    @Length(min = 3)
    private String name;
    @Min(value = 0)
    private Integer quantity;
    @NotNull
    private Boolean active;
    @NotNull
    private Integer countryId;
    @NotNull
    private Integer colorId;
}
