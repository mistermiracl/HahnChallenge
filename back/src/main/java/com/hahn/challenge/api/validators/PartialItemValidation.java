package com.hahn.challenge.api.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PartialItemValidator.class)
public @interface PartialItemValidation {
    String message() default "Invalid field(s)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
