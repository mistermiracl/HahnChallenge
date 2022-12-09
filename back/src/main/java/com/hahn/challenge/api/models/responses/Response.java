package com.hahn.challenge.api.models.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    public static enum ResponseStatus {
        ok,
        error
    }

    private ResponseStatus status;
    private String message;
}
