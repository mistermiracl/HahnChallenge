package com.hahn.challenge.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
    @Column
    private Integer quantity;
    @Column
    private Boolean active;
    @Column
    private Integer countryId;
    @Column
    private Integer colorId;
    @ManyToOne
    @JoinColumn(name = "countryId", insertable = false, updatable = false)
    private Country country;
    @ManyToOne
    @JoinColumn(name = "colorId", insertable = false, updatable = false)
    private Color color;
}
