package com.hahn.challenge.api.validators;

import java.util.Map;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PartialItemValidator implements ConstraintValidator<PartialItemValidation, Map<String, Object>> {

    @Override
    public boolean isValid(Map<String, Object> value, ConstraintValidatorContext context) {
        System.out.println(value);
        for (var entry : value.entrySet()) {
            var entryVal = entry.getValue();
            switch(entry.getKey()) {
                case "name":
                    if(entryVal == null || entryVal.toString().trim().isEmpty() || entryVal.toString().length() < 3)
                        return false;
                    break;
                case "quantity":
                    if(entryVal == null || !(entryVal instanceof Integer qty) || qty < 0)
                        return false;
                    break;
                case "active":
                    if(entryVal == null || !(entryVal instanceof Boolean))
                        return false;
                    break;
                case "countryId":
                    if(entryVal == null || !(entryVal instanceof Integer))
                        return false;
                    break;
                case "colorId":
                    if(entryVal == null || !(entryVal instanceof Integer))
                        return false;
                    break;
                default:
                    return false;
            }
        }
        return true;
    }

}