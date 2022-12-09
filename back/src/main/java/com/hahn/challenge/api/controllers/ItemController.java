package com.hahn.challenge.api.controllers;

import java.util.List;
import java.util.Map;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hahn.challenge.domain.entities.Item;
import com.hahn.challenge.application.services.ItemService;
import com.hahn.challenge.api.models.requests.ItemRequest;
import com.hahn.challenge.api.models.responses.ColorResponse;
import com.hahn.challenge.api.models.responses.CountryResponse;
import com.hahn.challenge.api.models.responses.ItemResponse;
import com.hahn.challenge.api.models.responses.Response;
import com.hahn.challenge.api.validators.PartialItemValidation;

@RestController
@RequestMapping("/api/items")
@Validated
public class ItemController {
    
    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    private ItemResponse buildItemResponse(Item item) {
        return ItemResponse.builder()
            .id(item.getId())
            .name(item.getName())
            .quantity(item.getQuantity())
            .active(item.getActive())
            .countryId(item.getCountryId())
            .colorId(item.getColorId())
            .country(new CountryResponse(item.getCountry().getId(), item.getCountry().getName()))
            .color(new ColorResponse(item.getColor().getId(), item.getColor().getName(), item.getColor().getHex()))
            .build();
    }

    @GetMapping
    public List<ItemResponse> index() {
        return itemService.findAll().stream().map(item -> buildItemResponse(item)).toList();
    }

    @PostMapping
    public Response save(@Valid @RequestBody ItemRequest itemRequest) {
        itemService.save(Item.builder()
            .name(itemRequest.getName())
            .quantity(itemRequest.getQuantity())
            .active(itemRequest.getActive())
            .countryId(itemRequest.getCountryId())
            .colorId(itemRequest.getColorId())
            .build()
        );
        return Response.builder()
            .status(Response.ResponseStatus.ok)
            .message("created")
            .build();
    }

    @GetMapping("/{id}")
    public ItemResponse get(@PathVariable("id") Integer id) {
        var item = itemService.find(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return buildItemResponse(item);
    }

    @PatchMapping("/{id}")
    public Response patch(@PathVariable("id") Integer id, @PartialItemValidation @RequestBody Map<String, Object> itemRequest) {
        itemService.patch(id, itemRequest);

        return Response.builder()
            .status(Response.ResponseStatus.ok)
            .message("partially updated")
            .build();
    }

    @DeleteMapping("/{id}")
    public Response delete(@PathVariable("id") Integer id) {
        itemService.delete(id);

        return Response.builder()
            .status(Response.ResponseStatus.ok)
            .message("deleted")
            .build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Response> handleException(ConstraintViolationException ex) {
        return new ResponseEntity<>(new Response(Response.ResponseStatus.error, ex.getMessage()), HttpStatus.UNPROCESSABLE_ENTITY);
    }

}
